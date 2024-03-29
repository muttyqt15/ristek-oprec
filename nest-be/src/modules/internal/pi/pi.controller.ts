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
import { PiService } from './pi.service';
import { CreatePiDto, UpdatePIDto } from './pi.dto';
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
@ApiTags('PENGURUS INTI')
@Controller('pi')
export class PiController {
  constructor(private readonly piService: PiService) {}

  @Get()
  async getAllPengurusInti() {
    try {
      const totalPI = await this.piService.getAllUser();
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
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create pengurus inti - SUPER ADMIN',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created Pengurus Inti',
  })
  @ApiBody({ type: CreatePiDto })
  @Roles(MainRole.SUPER_ADMIN)
  @UseGuards(UserAuth, MainRoleGuard)
  @Post()
  async createPengurusInti(@Body() createPiDto: CreatePiDto) {
    try {
      const newUser = await this.piService.create(createPiDto);
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
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update pengurus inti - PI',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated Pengurus Inti',
  })
  @Roles(MainRole.SUPER_ADMIN)
  @UseGuards(UserAuth, MainRoleGuard)
  @Patch(':id')
  async updatePengurusInti(
    @Param('id') id: number,
    @Body() updateUserDto: UpdatePIDto,
  ) {
    await this.piService.update(id, updateUserDto);
    return {
      code: HttpStatus.OK,
      message: `Successfully updated Pengurus Inti with ID of ${id}, ${updateUserDto.name}`,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deleted pengurus inti - PI',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted Pengurus Inti',
  })
  @Roles(MainRole.SUPER_ADMIN)
  @UseGuards(UserAuth, MainRoleGuard)
  @Delete()
  async deleteAllPengurusInti() {
    const deleteStatus = await this.piService.deleteAll();
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
