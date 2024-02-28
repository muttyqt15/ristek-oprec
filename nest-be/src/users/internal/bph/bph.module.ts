import { Module } from '@nestjs/common';
import { BphController } from './bph.controller';
import { BphService } from './bph.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnggotaBPH } from 'src/entities/users/panitia/AnggotaBPH';

@Module({
  imports: [TypeOrmModule.forFeature([AnggotaBPH])],
  controllers: [BphController],
  providers: [BphService],
  exports: [BphService],
})
export class BphModule {}
