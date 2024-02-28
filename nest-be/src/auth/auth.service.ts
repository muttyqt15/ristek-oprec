import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PiService } from 'src/users/internal/pi/pi.service';
import { AuthDto } from './auth.dto';
import { BphService } from 'src/users/internal/bph/bph.service';
import { CreateBPHParams } from 'src/users/internal/bph/bph.types';
import { CreatePIParams } from 'src/users/internal/pi/pi.types';
import { MainRole } from 'src/entities/users/types/entity.types';
import { matchPassword } from 'src/utils/hash';
import { isCreateBPHParams, isCreatePIParams } from 'src/utils/isType';
import * as bcrypt from 'bcrypt';
export type CreateParams<T extends MainRole.PI | MainRole.BPH> =
  T extends MainRole.PI ? CreatePIParams : CreateBPHParams;

@Injectable()
export class AuthService {
  constructor(
    private readonly piService: PiService,
    private readonly bphService: BphService,
    private readonly jwtService: JwtService,
  ) {}
  async getTokens(userId: number, username: string, userRole: MainRole) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          subject: userId,
          username: username,
          role: userRole,
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

  getService(role) {
    let service;
    if (role === MainRole.BPH) {
      service = this.bphService;
    } else if (role === MainRole.PI) {
      service = this.piService;
    } else {
      return 'NON_STAFF IMPLEMENTATION';
    }
    return service;
  }

  async logOut(userId: string, role: MainRole) {
    const service = this.getService(role);
    return service.update(userId, { refreshToken: null });
  }

  async refreshTokens(userId: string, refreshToken: string, role: MainRole) {
    const service = this.getService(role);
    const user = await service.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await matchPassword(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken, user.role);
    return tokens;
  }

  async hashData(data: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
    role: MainRole,
  ) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    const service = this.getService(role);
    await service.update(userId, { refreshToken: hashedRefreshToken });
  }

  async logIn(userData: AuthDto) {
    const service = this.getService(userData.role);
    const user = await service.getByName(userData.name);
    if (!userData) throw new BadRequestException('User does not exist');
    console.log(user);
    const passwordMatches = await matchPassword(
      userData.password,
      user.password,
    );
    console.log(userData.password, user.password);
    console.log(await bcrypt.compare(userData.password, user.password));
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.name, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken, user.role);
    return {
      message: 'Successfully logged in!',
      tokens: tokens,
    };
  }
  // Hashing password twice will cause incorrect comparisons
  async signUp(createUserDto: AuthDto) {
    let service: PiService | BphService;
    switch (createUserDto.role) {
      case MainRole.PI:
        service = this.piService;
        createUserDto = { ...createUserDto } as CreatePIParams;
        break;
      case MainRole.BPH:
        service = this.bphService;
        createUserDto = { ...createUserDto } as CreateBPHParams;
        break;
      default:
        throw new HttpException(
          'Invalid role specified!',
          HttpStatus.BAD_REQUEST,
        );
    }
    const existingUser = await service.getByName(createUserDto.name);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    let newUser;

    if (isCreateBPHParams(createUserDto)) {
      console.log('Is BPH');
      newUser = await this.bphService.create({
        ...(createUserDto as CreateBPHParams),
      });
    } else if (isCreatePIParams(createUserDto)) {
      console.log('Is PI');
      newUser = await this.piService.create({
        ...(createUserDto as CreatePIParams),
      });
    } else {
      throw new HttpException('Something..? NON_STAFF', 500);
    }

    const tokens = await this.getTokens(newUser.id, newUser.name, newUser.role);
    await this.updateRefreshToken(
      newUser.id,
      tokens.refreshToken,
      newUser.role,
    );
    return tokens;
  }
}
