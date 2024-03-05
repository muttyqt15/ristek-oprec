import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AcaraService } from './acara.service';
import { UserAuth } from 'src/auth/guards/userAuth.guard';
import { MainRoleGuard } from 'src/auth/guards/role.guard';
import { MainRole } from 'src/entities/users/types/entity.types';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateSponsorDto, UpdateSponsorDto } from './dtos/sponsor.dto';

@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly acaraService: AcaraService) {}
  @Get()
  async get() {
    const sponsors = await this.acaraService.getAllSponsor();
    return {
      code: 200,
      message: 'Success!',
      sponsors: sponsors,
    };
  }

  @Get(':id')
  async getSponsorById(@Param('id') id: number) {
    return await this.acaraService.findSponsorById(id);
  }

  @Post()
  async createSponsor(@Body() createSponsorDto: CreateSponsorDto) {
    return await this.acaraService.createSponsor(createSponsorDto);
  }

  @Patch(':id')
  async updateSponsor(
    @Param('id') id: number,
    @Body() updateSponsorDto: UpdateSponsorDto,
  ) {
    return await this.acaraService.updateSponsorById(id, updateSponsorDto);
  }
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Delete sponsor - PI' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Successfully deleted sponsor',
  // })
  // @Roles(MainRole.SUPER_ADMIN, MainRole.PI)
  // @UseGuards(UserAuth, MainRoleGuard)
  // @Delete(':id')
  // async deleteSponsor(@Param('id') id: number) {
  //   return await this.acaraService.deleteSponsorById(id);
  // }
}
