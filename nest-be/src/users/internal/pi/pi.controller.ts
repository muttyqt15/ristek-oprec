import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { PiService } from './pi.service';
import { CreatePiDto } from './pi.dto';

@Controller('pi')
export class PiController {
  constructor(private readonly piService: PiService) {}

  @Get()
  async getAllPengurusInti() {
    return 'Hello!';
  }

  @Post()
  async createPengurusInti(@Body() createPiDto: CreatePiDto) {
    try {
      const newUser = await this.piService.createPengurusInti(createPiDto);
      return {
        code: HttpStatus.CREATED,
        message: 'User created successfully!',
        user: newUser,
      };
    } catch (error) {
      const statusCode = error.getStatus();
      return {
        code: statusCode,
        message: 'Failed to create user',
        error: error.message,
      };
    }
  }
}
