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
import { BphService } from './bph.service';
import { UserAuth } from 'src/auth/guards/userAuth.guard';
import { MainRoleGuard } from 'src/auth/guards/role.guard';
import { MainRole } from 'src/entities/users/types/entity.types';
import { CreateBPHDto, UpdateBPHDto } from './bph.dto';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('bph')
export class BphController {
  constructor(private readonly bphService: BphService) {}

  @Get()
  async getAllBPH() {
    return await this.bphService.getAllUser();
  }

  @Roles(MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @Delete()
  async deleteAllBph() {
    return await this.bphService.deleteAll();
  }

  @Roles(MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @Post()
  async createAnggotaBPH(@Body() createBPHDto: CreateBPHDto) {
    try {
      const newUser = await this.bphService.create(createBPHDto);
      return {
        code: HttpStatus.CREATED,
        message: `${createBPHDto.name} successfully became a ${createBPHDto.bph_role} in ${createBPHDto.divisi}!`,
        anggota_bph: newUser,
      };
    } catch (error) {
      const statusCode = error.getStatus();
      return {
        code: statusCode,
        message: 'Failed to create Anggota BPH!',
        error: error.message,
      };
    }
  }

  @Roles(MainRole.PI, MainRole.BPH)
  @UseGuards(UserAuth, MainRoleGuard)
  @Patch(':id')
  async updateAnggotaBPH(
    @Param('id') id: number,
    @Body() updateDto: UpdateBPHDto,
  ) {
    try {
      const newUser = await this.bphService.update(id, updateDto);
      return {
        code: HttpStatus.CREATED,
        message: `${updateDto.name} successfully updated and became a ${updateDto.bph_role} in ${updateDto.divisi}!`,
        anggota_bph: newUser,
      };
    } catch (error) {
      const statusCode = error.getStatus();
      return {
        code: statusCode,
        message: 'Failed to update Anggota BPH!',
        error: error.message,
      };
    }
  }
}
