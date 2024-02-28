import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('acara')
export class AcaraController {
  constructor(private readonly acaraService: AcaraService) {}

  @Roles(MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @Post()
  async createAcara(@Body() createAcaraDto: CreateAcaraDto) {
    const acara = await this.acaraService.create(createAcaraDto);
    return {
      code: 201,
      message: `Successfully created ${createAcaraDto.nama_acara}`,
      acara: acara,
    };
  }
  @Roles(MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @Delete(':id')
  async deleteAcara(@Param('id', ParseIntPipe) id: number) {
    await this.acaraService.delete(id);
    return {
      code: 200,
      message: `Successfully deleted acara with ID of ${id}`,
    };
  }

  @Roles(MainRole.PI, MainRole.BPH)
  @UseGuards(UserAuth, MainRoleGuard)
  @Patch(':id')
  async updateAcara(
    @Param('id') id: number,
    @Body() updateDetails: UpdateAcaraDto,
  ) {
    const acara = await this.acaraService.update(id, updateDetails);
    return {
      code: 200,
      message: `Successfully updated acara with ID of ${id}`,
      acara: acara,
    };
  }

  @Get()
  async getAllAcara() {
    return await this.acaraService.getAll();
  }

  @Get(':id')
  async getAcara(@Param('id') id: number) {
    return await this.acaraService.getById(id);
  }
}
