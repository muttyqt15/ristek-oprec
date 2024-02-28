import { Module } from '@nestjs/common';
import { AcaraService } from './acara.service';
import { AcaraController } from './acara.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acara } from 'src/entities/other/Acara';

@Module({
  imports: [TypeOrmModule.forFeature([Acara])],
  providers: [AcaraService],
  controllers: [AcaraController],
})
export class AcaraModule {}
