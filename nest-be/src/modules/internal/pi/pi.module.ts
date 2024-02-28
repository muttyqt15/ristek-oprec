import { Module } from '@nestjs/common';
import { PiService } from './pi.service';
import { PiController } from './pi.controller';
import { PengurusInti } from 'src/entities/users/panitia/PengurusInti';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PengurusInti])],
  providers: [PiService],
  controllers: [PiController],
  exports: [PiService],
})
export class PiModule {}
