import { Module } from '@nestjs/common';
import { RapatController } from './rapat.controller';
import { RapatService } from './rapat.service';

@Module({
  controllers: [RapatController],
  providers: [RapatService]
})
export class RapatModule {}
