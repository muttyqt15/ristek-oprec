import { Module } from '@nestjs/common';
import { BphController } from './bph.controller';
import { BphService } from './bph.service';

@Module({
  controllers: [BphController],
  providers: [BphService],
})
export class BphModule {}
