import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import strategies from './strategies';
import { BphModule } from 'src/modules/internal/bph/bph.module';
import { PiModule } from 'src/modules/internal/pi/pi.module';
import { AcaraModule } from 'src/modules/external/acara/acara.module';
import { MentoringModule } from 'src/modules/external/mentoring/mentoring.module';

@Module({
  imports: [
    JwtModule.register({}),
    PiModule,
    BphModule,
    AcaraModule,
    MentoringModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...strategies],
})
export class AuthModule {}
