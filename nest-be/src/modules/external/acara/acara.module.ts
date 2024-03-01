import { Module } from '@nestjs/common';
import { AcaraService } from './acara.service';
import { AcaraController } from './acara.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acara } from 'src/entities/other/Acara';
import { Sponsor } from 'src/entities/users/external/Sponsor';
import { Speaker } from 'src/entities/users/external/Speaker';

@Module({
  imports: [TypeOrmModule.forFeature([Acara, Sponsor, Speaker])],
  providers: [AcaraService],
  controllers: [AcaraController],
  exports: [AcaraService],
})
export class AcaraModule {}
