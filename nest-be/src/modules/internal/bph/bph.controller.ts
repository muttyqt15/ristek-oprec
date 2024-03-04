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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BphService } from './bph.service';
import { UserAuth } from 'src/auth/guards/userAuth.guard';
import { MainRoleGuard } from 'src/auth/guards/role.guard';
import { MainRole } from 'src/entities/users/types/entity.types';
import { CreateBPHDto, UpdateBPHDto } from './bph.dto';
import { ExtraRoles, Roles } from 'src/auth/roles/roles.decorator';
import { PengurusIntiRole } from 'src/entities/users/types/pi.types';

@ApiTags('BPH')
@Controller('bph')
export class BphController {
  constructor(private readonly bphService: BphService) {}

  @ApiOperation({ summary: 'Get all BPH members' }) // Operation metadata
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all BPH members',
  }) // Response metadata
  @Get()
  async getAllBPH() {
    return await this.bphService.getAllUser();
  }

  @ApiBearerAuth() // Authentication metadata
  @ApiOperation({ summary: 'Delete all BPH members (Only for PI and PO)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All BPH members deleted successfully',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI) // Authorization metadata
  @ExtraRoles(PengurusIntiRole.PO, PengurusIntiRole.VPO_INTERNAL)
  @UseGuards(UserAuth, MainRoleGuard)
  @Delete()
  async deleteAllBph() {
    return await this.bphService.deleteAll();
  }

  @ApiBearerAuth() // Authentication metadata
  @ApiOperation({ summary: 'Create a new BPH member' })
  @ApiBody({ type: CreateBPHDto }) // Request body metadata
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New BPH member created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to create BPH member',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI) // Authorization metadata
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

  @ApiBearerAuth() // Authentication metadata
  @ApiOperation({ summary: 'Update a BPH member' })
  @ApiBody({ type: UpdateBPHDto }) // Request body metadata
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'BPH member updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to update BPH member',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI, MainRole.BPH) // Authorization metadata
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
