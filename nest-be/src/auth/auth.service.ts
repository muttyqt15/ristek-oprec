import {
  BadRequestException,
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
import { hashPassword } from 'src/utils/hash';
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
  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          subject: userId,
          username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          subject: userId,
          username,
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
    let service;
    if (role === MainRole.BPH) {
      service = this.bphService;
    } else if (role === MainRole.PI) {
      service = this.piService;
    } else {
      return 'Dunno';
    }

    console.log(role);
    await service.update(userId, { refreshToken: hashedRefreshToken });
  }

  async signUp(
    createUserDto: AuthDto,
    // role: T,
  ) {
    let service: PiService | BphService;
    switch (createUserDto.role) {
      // If PI, set dto to PI object and use PI service
      case MainRole.PI:
        service = this.piService;
        createUserDto = { ...createUserDto } as CreatePIParams;
        break;
      // If BPH, set dto to BPH object and use BPH service
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
    const hashedPassword = await hashPassword(createUserDto.password);
    let newUser;

    // Mungkin juga bisa check createUserDto.rol
    if (isCreateBPHParams(createUserDto)) {
      console.log('Is BPH');
      newUser = await this.bphService.create({
        ...(createUserDto as CreateBPHParams),
        password: hashedPassword,
      });
    } else if (isCreatePIParams(createUserDto)) {
      console.log('Is PI');
      newUser = await this.piService.create({
        ...(createUserDto as CreatePIParams),
        password: hashedPassword,
      });
    } else {
      throw new HttpException('Something..? NON_STAFF', 500);
    }
    const tokens = await this.getTokens(newUser.id, newUser.name);
    await this.updateRefreshToken(
      newUser.id,
      tokens.refreshToken,
      newUser.role,
    );
    return tokens;
  }
}
