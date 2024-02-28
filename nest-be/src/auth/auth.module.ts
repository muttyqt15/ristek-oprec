import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import strategies from './strategies';
import { PiModule } from 'src/users/internal/pi/pi.module';
import { BphModule } from 'src/users/internal/bph/bph.module';

@Module({
  imports: [JwtModule.register({}), PiModule, BphModule],
  controllers: [AuthController],
  providers: [AuthService, ...strategies],
})
export class AuthModule {}
