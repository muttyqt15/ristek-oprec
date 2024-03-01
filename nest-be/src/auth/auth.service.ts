import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './auth.dto';
import { MainRole } from 'src/entities/users/types/entity.types';
import { matchPassword } from 'src/utils/hash';
import { isCreateBPHParams, isCreatePIParams } from 'src/utils/isType';
import * as bcrypt from 'bcrypt';
import { CreatePIParams } from 'src/modules/internal/pi/types';
import { CreateBPHParams } from 'src/modules/internal/bph/bph.types';
import { PiService } from 'src/modules/internal/pi/pi.service';
import { BphService } from 'src/modules/internal/bph/bph.service';
import { BPH_ROLE } from 'src/entities/users/types/bph.types';
import { OKK_Mentoring } from 'src/entities/users/types/okk.types';
import { PengurusIntiRole } from 'src/entities/users/types/pi.types';
import { MentoringService } from 'src/modules/external/mentoring/mentoring.service';
import { AcaraService } from 'src/modules/external/acara/acara.service';
import { CreateMentorParams } from 'src/modules/external/mentoring/dtos/mentor.types';
import { CreateMenteeParams } from 'src/modules/external/mentoring/dtos/mentee.types';

export type ControlRoles = BPH_ROLE | OKK_Mentoring | PengurusIntiRole;
export type ServiceType<T extends PiService | BphService> = T extends BphService
  ? PiService
  : BphService;
@Injectable()
export class AuthService {
  constructor(
    private readonly piService: PiService,
    private readonly bphService: BphService,
    private readonly mentoringService: MentoringService,
    private readonly acaraService: AcaraService,
    private readonly jwtService: JwtService,
  ) {}
  async getTokens(
    userId: number,
    username: string,
    userRole: MainRole,
    extraRolesPromise: Promise<ControlRoles>, // Parameter name indicate it's a Promise
  ) {
    // Wait for the promise to resolve
    const extraRoles = await extraRolesPromise;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          subject: userId,
          username: username,
          role: userRole,
          extraRoles: extraRoles, // Because extraRoles is resolved, it can be directly passed
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          subject: userId,
          username: username,
          role: userRole,
          extraRoles: extraRoles, // Again, pass the resolved extraRoles
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  getService(role: MainRole) {
    let service: any;
    if (role === MainRole.BPH) {
      service = this.bphService;
    } else if (role === MainRole.PI) {
      service = this.piService;
    } else if (role === MainRole.NON_STAFF || role === MainRole.MENTOR) {
      service = this.mentoringService;
    } else if (role === MainRole.SPONSOR) {
      service = this.acaraService;
    }
    return service;
  }

  async logOut(userId: string, role: MainRole) {
    const service = this.getService(role);
    return service.update(userId, { refreshToken: null });
  }

  async checkExtraRoles(id: number, role: MainRole): Promise<ControlRoles> {
    let extraRole: ControlRoles | undefined;

    try {
      switch (role) {
        case MainRole.PI:
          const piUser = await this.piService.findById(id);
          extraRole = piUser ? piUser.pi_role : undefined;
          break;
        case MainRole.BPH:
          const bphUser = await this.bphService.findById(id);
          extraRole = bphUser ? bphUser.bph_role : undefined;
          break;
        case MainRole.MENTOR:
          extraRole = OKK_Mentoring.MENTOR;
          break;
        case MainRole.NON_STAFF:
          extraRole = OKK_Mentoring.MENTEE;
          break;
        default:
          console.log('Role not relevant yet..');
          break;
      }
    } catch (error) {
      console.error(error);
    }

    return extraRole;
  }

  async refreshTokens(userId: number, refreshToken: string, role: MainRole) {
    const service = this.getService(role);
    const extraRolePromise = this.checkExtraRoles(userId, role);
    const user = await service.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await matchPassword(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(
      user.id,
      user.username,
      user.role,
      extraRolePromise,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken, user.role);
    return tokens;
  }

  async hashData(data: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
    role: MainRole,
  ) {
    const hashedRefreshToken = await this.hashData(refreshToken); // Extra role will come from refreshToken logic
    const service = this.getService(role);
    if (role == MainRole.BPH || role == MainRole.PI) {
      await service.update(userId, { refreshToken: hashedRefreshToken });
    } else if (role == MainRole.MENTOR) {
      await this.mentoringService.updateMentor(userId, {
        refreshToken: hashedRefreshToken,
      });
    } else if (role == MainRole.NON_STAFF) {
      await this.mentoringService.updateMentor(userId, {
        refreshToken: hashedRefreshToken,
      });
    }
  }

  async logIn(userData: AuthDto) {
    const service = this.getService(userData.role);
    let user: any;
    if (userData.role == MainRole.NON_STAFF) {
      user = await this.mentoringService.findMenteeByName(userData.name);
    } else if (userData.role == MainRole.MENTOR) {
      user = await this.mentoringService.findMentorByName(userData.name);
    } else {
      // PI AND BPH
      user = await service.getByName(userData.name);
    }

    if (!user) throw new BadRequestException('User does not exist');
    console.log(user);
    const passwordMatches = await matchPassword(
      userData.password,
      user.password,
    );
    console.log(userData.password, user.password);
    console.log(await bcrypt.compare(userData.password, user.password));
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const extraRolesPromise = this.checkExtraRoles(user.id, user.role);
    const tokens = await this.getTokens(
      user.id,
      user.name,
      user.role,
      extraRolesPromise,
    );

    await this.updateRefreshToken(user.id, tokens.refreshToken, user.role);
    return {
      message: 'Successfully logged in!',
      tokens: tokens,
    };
  }

  // Hashing password twice will cause incorrect comparisons
  async signUp(createUserDto: AuthDto) {
    let service: any;
    switch (createUserDto.role) {
      case MainRole.PI:
        service = this.piService;
        createUserDto = { ...createUserDto } as CreatePIParams;
        break;
      case MainRole.BPH:
        service = this.bphService;
        createUserDto = { ...createUserDto } as CreateBPHParams;
        break;
      case MainRole.MENTOR:
        service = this.mentoringService;
        createUserDto = { ...createUserDto } as CreateMentorParams;
        break;
      case MainRole.NON_STAFF:
        console.log('Masuk');
        service = this.mentoringService;
        createUserDto = { ...createUserDto } as CreateMenteeParams;
        break;
      default:
        throw new HttpException(
          'Invalid role specified!',
          HttpStatus.BAD_REQUEST,
        );
    }
    if (
      createUserDto.role == MainRole.BPH ||
      createUserDto.role == MainRole.PI
    ) {
      const existingUser = await service.getByName(createUserDto.name);
      console.log('Existing user!', existingUser);

      if (existingUser != null) {
        throw new BadRequestException('User already exists');
      }
    } else if (createUserDto.role == MainRole.MENTOR) {
      const existingUser = await this.mentoringService.findMentorByName(
        createUserDto.name,
      );
      if (existingUser != null) {
        throw new BadRequestException('Mentor already exists');
      }
    } else if (createUserDto.role == MainRole.NON_STAFF) {
      const existingUser = await this.mentoringService.findMenteeByName(
        createUserDto.name,
      );
      // console.log(existingUser);
      if (existingUser != null) {
        throw new BadRequestException('Mentee already exists');
      }
    }

    let newUser;

    if (isCreateBPHParams(createUserDto)) {
      newUser = await this.bphService.create({
        ...(createUserDto as CreateBPHParams),
      });
      console.log(newUser);
    } else if (isCreatePIParams(createUserDto)) {
      newUser = await this.piService.create({
        ...(createUserDto as CreatePIParams),
      });
    } else if (createUserDto.role == MainRole.MENTOR) {
      newUser = await this.mentoringService.createMentor({
        ...(createUserDto as CreateMentorParams),
      });
    } else if (createUserDto.role == MainRole.NON_STAFF) {
      newUser = await this.mentoringService.createMentee({
        ...(createUserDto as CreateMenteeParams),
      });
    } else {
      throw new HttpException('Something..? NON_STAFF', 500);
    }

    const extraRolePromise = this.checkExtraRoles(newUser.id, newUser.role);
    const tokens = await this.getTokens(
      newUser.id,
      newUser.name,
      newUser.role,
      extraRolePromise,
    );
    await this.updateRefreshToken(
      newUser.id,
      tokens.refreshToken,
      newUser.role,
    );
    return tokens;
  }
}
