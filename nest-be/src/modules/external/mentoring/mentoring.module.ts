import { Module } from '@nestjs/common';
import { MentoringController } from './mentoring.controller';
import { MentoringService } from './mentoring.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupOKK } from 'src/entities/other/GroupOKK';
import { Mentor } from 'src/entities/users/panitia/Mentor';
import { Mentee } from 'src/entities/users/external/Mentee';

@Module({
  controllers: [MentoringController],
  providers: [MentoringService],
  imports: [TypeOrmModule.forFeature([GroupOKK, Mentor, Mentee])],
  exports: [MentoringService],
})
export class MentoringModule {}
