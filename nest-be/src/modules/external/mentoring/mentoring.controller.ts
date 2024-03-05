import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MentoringService } from './mentoring.service';
import { CreateGroupOKKDto } from './dtos/groupokk.dto';
import { BaseUserDto } from 'src/modules/types/BaseUser.dto';
import { MainRole } from 'src/entities/users/types/entity.types';
import { CreateMentorDto } from './dtos/mentor.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { MainRoleGuard } from 'src/auth/guards/role.guard';
import { UserAuth } from 'src/auth/guards/userAuth.guard';
import { CreateMenteeDto } from './dtos/mentee.dto';

@Roles(MainRole.MENTOR, MainRole.SUPER_ADMIN)
@ApiTags('MENTORING')
@Controller('mentoring')
export class MentoringController {
  constructor(private readonly mentoringService: MentoringService) {}

  @ApiOperation({
    summary: 'Get all groups - Public',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully retrieved all groups!',
  })
  @Get('group')
  async getAllGroups() {
    const allGroups = await this.mentoringService.findAllGroups();
    return {
      code: HttpStatus.OK,
      message: 'Successfully found all groups!',
      groups: allGroups,
    };
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create OKK group - MENTOR',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created new group!',
  })
  @ApiBody({ type: CreateGroupOKKDto })
  @Roles(MainRole.SUPER_ADMIN, MainRole.MENTOR)
  @UseGuards(UserAuth, MainRoleGuard)
  @Post('group')
  async createGroupOKK(@Body() createGroupDto: CreateGroupOKKDto) {
    const { group_name, menteeIds, mentorId } = createGroupDto;
    console.log(createGroupDto);
    const group = await this.mentoringService.createGroup(
      group_name,
      mentorId,
      menteeIds,
    );
    return {
      message: `Successfully created OKK group ${createGroupDto.group_name}!`,
      group: group,
    };
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete all OKK groups - MENTOR',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully deleted all groups!',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.MENTOR)
  @UseGuards(UserAuth, MainRoleGuard)
  @Delete('group')
  async deleteAllGroupOKK() {
    return await this.mentoringService.deleteAllGroups();
  }

  // Mentor endpoints
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create mentor - PI, BPH, MENTOR',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created mentor!',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.MENTOR, MainRole.BPH, MainRole.PI)
  @UseGuards(UserAuth, MainRoleGuard)
  @ApiBody({ type: CreateMentorDto })
  @Post('mentor')
  async createMentorOKK(@Body() createMentorDto: CreateMentorDto) {
    const mentor = await this.mentoringService.createMentor({
      ...createMentorDto,
      role: MainRole.MENTOR,
    });
    return {
      mentor: mentor,
      message: `Successfully created ${createMentorDto.name}, our newest mentor!`,
    };
  }

  @Get('mentor')
  async getAllMentors() {
    const mentors = await this.mentoringService.findAllMentors();
    return {
      message: 'Successfully found all mentors!',
      mentors: mentors,
    };
  }
  @ApiOperation({
    summary: 'Creates mentee OKK entity - MENTOR',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully created mentee!',
  })
  @Roles(MainRole.SUPER_ADMIN, MainRole.MENTOR)
  @UseGuards(UserAuth, MainRoleGuard)
  @ApiBody({ type: CreateMenteeDto })
  @Post('mentee')
  async createMenteeOKK(
    @Body() createMenteeDto: BaseUserDto & { jalur_masuk: string },
  ) {
    const mentee = await this.mentoringService.createMentee(createMenteeDto);
    return {
      mentee: mentee,
      message: `Successfully created ${createMenteeDto.name}, our newest mentee!`,
    };
  }

  @ApiOperation({
    summary: 'Finds all mentees from all groups - Public',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully found all mentees!',
  })
  @Get('mentee')
  async findAllMentee() {
    const allMentees = await this.mentoringService.findAllMentee();
    return {
      message: 'Successfully found mentees from all groups!',
      mentees: allMentees,
    };
  }
}
