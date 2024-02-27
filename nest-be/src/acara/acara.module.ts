import { Module } from '@nestjs/common';
import { AcaraService } from './acara.service';
import { AcaraController } from './acara.controller';

@Module({
  providers: [AcaraService],
  controllers: [AcaraController]
})
export class AcaraModule {}
