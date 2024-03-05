import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AcaraService } from './acara.service';
import { CreateSpeakerDto } from './dtos/CreateSpeaker.dto';
import { MainRoleGuard } from 'src/auth/guards/role.guard';
import { UserAuth } from 'src/auth/guards/userAuth.guard';
import { MainRole } from 'src/entities/users/types/entity.types';
import { Roles } from 'src/auth/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('SPEAKERS')
@Controller('speakers')
export class SpeakersController {
  constructor(private readonly acaraService: AcaraService) {}

  @ApiOperation({ summary: 'Find all speakers - PUBLIC' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted speaker',
  })
  @Get()
  async findAllSpeakers() {
    return await this.acaraService.getAllSpeaker();
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete speaker - PI' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted speaker',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @ApiBody({ type: CreateSpeakerDto })
  @Post()
  async createSpeaker(@Body() createSpeakerDto: CreateSpeakerDto) {
    return await this.acaraService.createSpeaker(createSpeakerDto);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete speaker - PI' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted speaker',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @Delete(':id')
  async deleteSpeaker(@Param('id') id: number) {
    return await this.acaraService.deleteSpeakerById(id);
  }
  @ApiOperation({ summary: 'Find specific speaker - PUBLIC' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted speaker',
  })
  @Get(':id')
  async getSpaeker(@Param('id') id: number) {
    return await this.acaraService.getSpeakerById(id);
  }
}
