import { Body, Controller, Get, Post } from '@nestjs/common';
import { AcaraService } from './acara.service';
import { CreateSpeakerDto } from './dtos/CreateSpeaker.dto';

@Controller('speakers')
export class SpeakersController {
  constructor(private readonly acaraService: AcaraService) {}

  @Get()
  async findAllSpeakers() {
    return await this.acaraService.getAllSpeaker();
  }
  @Post()
  async createSpeaker(@Body() createSpeakerDto: CreateSpeakerDto) {
    return await this.acaraService.createSpeaker(createSpeakerDto);
  }
}
