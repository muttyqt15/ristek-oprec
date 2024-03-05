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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSponsorDto, UpdateSponsorDto } from './dtos/sponsor.dto';

@ApiTags('SPONSORS')
@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly acaraService: AcaraService) {}
  @ApiOperation({ summary: 'Find all sponsor - PUBLIC' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated sponsor',
  })
  @Get()
  async get() {
    const sponsors = await this.acaraService.getAllSponsor();
    return {
      code: HttpStatus.OK,
      message: 'Success!',
      sponsors: sponsors,
    };
  }
  @ApiOperation({ summary: 'Find sponsor by ID - PUBLIC' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated sponsor',
  })
  @Get(':id')
  async getSponsorById(@Param('id') id: number) {
    const sponsor = await this.acaraService.findSponsorById(id);
    return {
      code: HttpStatus.OK,
      message: 'Success!',
      sponsors: sponsor,
    };
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create sponsor - PI' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated sponsor',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @Post()
  async createSponsor(@Body() createSponsorDto: CreateSponsorDto) {
    const sponsor = await this.acaraService.createSponsor(createSponsorDto);
    return {
      code: HttpStatus.CREATED,
      message: 'Success!',
      sponsors: sponsor,
    };
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update sponsor - PI' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated sponsor',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @Patch(':id')
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
