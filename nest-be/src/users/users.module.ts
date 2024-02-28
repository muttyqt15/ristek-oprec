import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PiModule } from './internal/pi/pi.module';
import { BphModule } from './internal/bph/bph.module';

@Module({
  imports: [PiModule, BphModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
