import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateAcaraDto, UpdateAcaraDto } from './acara.dto';
import { AcaraService } from './acara.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { MainRole } from 'src/entities/users/types/entity.types';
import { UserAuth } from 'src/auth/guards/userAuth.guard';
import { MainRoleGuard } from 'src/auth/guards/role.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSponsorDto, UpdateSponsorDto } from './dtos/sponsor.dto';

@ApiTags('ACARA')
@Controller('acara')
export class AcaraController {
  constructor(private readonly acaraService: AcaraService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create OKK Event - PI' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created OKK event',
  })
  @ApiBody({ type: CreateAcaraDto })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @Post()
  async createEvent(@Body() createAcaraDto: CreateAcaraDto) {
    const acara = await this.acaraService.createAcara(createAcaraDto);
    return {
      code: HttpStatus.CREATED,
      message: `Successfully created ${createAcaraDto.nama_acara}`,
      acara: acara,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete OKK Event' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted OKK event',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @Delete(':id')
  async deleteEvent(@Param('id', ParseIntPipe) id: number) {
    await this.acaraService.deleteAcaraById(id);
    return {
      code: HttpStatus.OK,
      message: `Successfully deleted acara with ID of ${id}`,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update OKK Event - PI, BPH' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated OKK event',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI, MainRole.BPH)
  @UseGuards(UserAuth, MainRoleGuard)
  @Patch(':id')
  async updateEvent(
    @Param('id') id: number,
    @Body() updateDetails: UpdateAcaraDto,
  ) {
    const acara = await this.acaraService.updateAcara(id, updateDetails);
    return {
      code: HttpStatus.OK,
      message: `Successfully updated acara with ID of ${id}`,
      acara: acara,
    };
  }

  @ApiOperation({ summary: 'Get All OKK Events - PUBLIC' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved all OKK events',
  })
  @Get()
  async getAllEvents() {
    return await this.acaraService.getAllAcara();
  }

  @ApiOperation({ summary: 'Get OKK Event by ID - PUBLIC' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved OKK event by ID',
  })
  @Get(':id')
  async getAcara(@Param('id') id: number) {
    return await this.acaraService.getAcaraById(id);
  }

  @Get('sponsor')
  async getSponsors() {
    return await this.acaraService.getAllSponsor();
  }

  @Get('sponsor/:id')
  async getSponsorById(@Param('id') id: number) {
    return await this.acaraService.findSponsorById(id);
  }

  @Post('sponsor')
  async createSponsor(@Body() createSponsorDto: CreateSponsorDto) {
    return await this.acaraService.createSponsor(createSponsorDto);
  }

  @Patch('sponsor/:id')
  async updateSponsor(
    @Param('id') id: number,
    @Body() updateSponsorDto: UpdateSponsorDto,
  ) {
    return await this.acaraService.updateSponsorById(id, updateSponsorDto);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete sponsor - PI' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted sponsor',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @Delete(':id')
  async deleteSponsor(@Param('id') id: number) {
    return await this.acaraService.deleteSponsorById(id);
  }
}
