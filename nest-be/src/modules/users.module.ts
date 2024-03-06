import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PiModule } from './internal/pi/pi.module';
import { BphModule } from './internal/bph/bph.module';
import { MentoringModule } from './external/mentoring/mentoring.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdmin } from 'src/entities/users/SuperAdmin';

@Module({
  imports: [
    PiModule,
    BphModule,
    MentoringModule,
    TypeOrmModule.forFeature([SuperAdmin]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
