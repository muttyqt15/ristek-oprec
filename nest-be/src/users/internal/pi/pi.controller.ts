import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PiService } from './pi.service';
import { CreatePiDto, UpdatePIDto } from './pi.dto';

@Controller('pi')
export class PiController {
  constructor(private readonly piService: PiService) {}

  @Get()
  async getAllPengurusInti() {
    try {
      const totalPI = await this.piService.getAllPengurusInti();
      return {
        code: HttpStatus.OK,
        message: 'Found all Pengurus Inti OKK!',
        total_pengurus_inti: totalPI,
      };
    } catch (error) {
      const statusCode = error.getStatus();
      return {
        code: statusCode,
        message: 'Failed to find Pengurus Inti!',
        error: error.message,
      };
    }
  }

  @Post()
  async createPengurusInti(@Body() createPiDto: CreatePiDto) {
    try {
      const newUser = await this.piService.createPengurusInti(createPiDto);
      return {
        code: HttpStatus.CREATED,
        message: `${createPiDto.pi_role} created successfully!`,
        pengurus_inti: newUser,
      };
    } catch (error) {
      const statusCode = error.getStatus();
      return {
        code: statusCode,
        message: 'Failed to create Pengurus Inti!',
        error: error.message,
      };
    }
  }
  @Patch(':id')
  async updatePengurusInti(
    @Param('id') id: number,
    @Body() updateUserDto: UpdatePIDto,
  ) {
    await this.piService.updatePengurusInti(id, updateUserDto);
    return {
      code: HttpStatus.OK,
      message: `Successfully updated Pengurus Inti with ID of ${id}, ${updateUserDto.name}`,
    };
  }
  @Delete()
  async deleteAllPengurusInti() {
    const deleteStatus = await this.piService.deleteAllPI();
    if (deleteStatus) {
      return {
        code: HttpStatus.OK,
        message: `All Pengurus Inti deleted successfully!`,
      };
    } else {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to delete Pengurus Inti!',
      };
    }
  }
}
