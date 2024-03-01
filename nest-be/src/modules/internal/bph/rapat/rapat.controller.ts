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
import { ExtraRoles, Roles } from 'src/auth/roles/roles.decorator';
import { MainRole } from 'src/entities/users/types/entity.types';
import { UserAuth } from 'src/auth/guards/userAuth.guard';
import { MainRoleGuard } from 'src/auth/guards/role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RapatService } from './rapat.service';
import { CreateRapatDto } from './rapat.dto';
import { BPH_ROLE } from 'src/entities/users/types/bph.types';
import { ExtraRoleGuard } from 'src/auth/roles/extraRoles.guard';

@ApiTags('Rapat')
@Controller('Rapat')
export class RapatController {
  constructor(private readonly rapatService: RapatService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create rapat' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created BPH Rapat',
  })
  @Roles(MainRole.BPH)
  @ExtraRoles(BPH_ROLE.PJ, BPH_ROLE.WAPJ)
  @UseGuards(UserAuth, MainRoleGuard, ExtraRoleGuard)
  @Post()
  async createRapat(@Body() createRapatDto: CreateRapatDto) {
    const Rapat = await this.rapatService.createRapat(createRapatDto);
    return {
      code: HttpStatus.CREATED,
      message: `Successfully created ${createRapatDto.rapat_name}`,
      rapat: Rapat,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete BPH Rapat' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted BPH Rapat',
  })
  @Roles(MainRole.BPH)
  @ExtraRoles(BPH_ROLE.PJ, BPH_ROLE.WAPJ)
  @UseGuards(UserAuth, MainRoleGuard, ExtraRoleGuard)
  @Delete(':id')
  async deleteRapat(@Param('id', ParseIntPipe) id: number) {
    await this.rapatService.deleteRapatById(id);
    return {
      code: HttpStatus.OK,
      message: `Successfully deleted Rapat with ID of ${id}`,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update BPH Rapat' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated BPH Rapat',
  })
  @Roles(MainRole.PI, MainRole.BPH)
  @UseGuards(UserAuth, MainRoleGuard)
  @Patch(':id')
  async updateRapat(
    @Param('id') id: number,
    @Body() updateDetails: Partial<CreateRapatDto>,
  ) {
    const Rapat = await this.rapatService.updateRapat(id, updateDetails);
    return {
      code: HttpStatus.OK,
      message: `Successfully updated Rapat with ID of ${id}`,
      Rapat: Rapat,
    };
  }

  @ApiOperation({ summary: 'Get All BPH Rapats' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved all BPH Rapats',
  })
  @Get()
  async getAllRapats() {
    const rapats = await this.rapatService.getAllRapat();
    return {
      message: 'Successfully get all rapats!',
      rapats: rapats,
    };
  }

  @ApiOperation({ summary: 'Get BPH Rapat by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved BPH Rapat by ID',
  })
  @Get(':id')
  async getRapat(@Param('id') id: number) {
    return await this.rapatService.getRapatById(id);
  }
}
