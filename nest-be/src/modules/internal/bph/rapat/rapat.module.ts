import { Module } from '@nestjs/common';
import { RapatController } from './rapat.controller';
import { RapatService } from './rapat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rapat } from 'src/entities/other/Rapat';
import { BphModule } from '../bph.module';

@Module({
  controllers: [RapatController],
  providers: [RapatService],
  imports: [TypeOrmModule.forFeature([Rapat]), BphModule],
})
export class RapatModule {}
