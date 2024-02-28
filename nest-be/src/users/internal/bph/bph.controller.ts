import { Controller, Delete, Get } from '@nestjs/common';
import { BphService } from './bph.service';

@Controller('bph')
export class BphController {
  constructor(private readonly bphService: BphService) {}

  @Get()
  async getAllBPH() {
    return await this.bphService.getAllUser();
  }

  @Delete()
  async deleteAllBph() {
    return await this.bphService.deleteAll();
  }
}
