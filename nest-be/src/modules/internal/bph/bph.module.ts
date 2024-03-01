import { Module } from '@nestjs/common';
import { BphController } from './bph.controller';
import { BphService } from './bph.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnggotaBPH } from 'src/entities/users/panitia/AnggotaBPH';
import { RapatModule } from './rapat/rapat.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnggotaBPH])],
  controllers: [BphController],
  providers: [BphService],
  exports: [BphService],
})
export class BphModule {}
