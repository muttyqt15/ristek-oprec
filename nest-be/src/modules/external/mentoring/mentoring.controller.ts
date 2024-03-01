import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MentoringService } from './mentoring.service';
import { GroupOKKDto } from './dtos/groupokk.dto';
import { BaseUserDto } from 'src/modules/types/BaseUser.dto';
import { MainRole } from 'src/entities/users/types/entity.types';
import { CreateMentorDto } from './dtos/mentor.dto';

@Controller('mentoring')
export class MentoringController {
  constructor(private readonly mentoringService: MentoringService) {}

  // Group endpoints
  @Get('group')
  async getAllGroups() {
    const allGroups = await this.mentoringService.findAllGroups();
    return {
      code: HttpStatus.OK,
      message: 'Successfully found all groups!',
      groups: allGroups,
    };
  }
  @Post('group')
  async createGroupOKK(@Body() createGroupDto: GroupOKKDto) {
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

  @Delete('group')
  async deleteAllGroupOKK() {
    return await this.mentoringService.deleteAllGroups();
  }

  // Mentor endpoints
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

  @Get('mentee')
  async findAllMentee() {
    const allMentees = await this.mentoringService.findAllMentee();
    return {
      message: 'Successfully found mentees from all groups!',
      mentees: allMentees,
    };
  }
}
