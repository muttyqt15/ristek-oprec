import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PiModule } from './internal/pi/pi.module';
import { BphModule } from './internal/bph/bph.module';
import { MentoringModule } from './external/mentoring/mentoring.module';

@Module({
  imports: [PiModule, BphModule, MentoringModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
