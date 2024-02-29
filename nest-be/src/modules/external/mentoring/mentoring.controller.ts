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

@Controller('mentoring')
export class MentoringController {
  constructor(private readonly mentoringService: MentoringService) {}
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
  @Post('mentor')
  async createMentorOKK(@Body() createMentorDto: BaseUserDto) {
    const mentor = await this.mentoringService.createMentor(createMentorDto);
    return {
      mentor: mentor,
      message: `Successfully created ${createMentorDto.name}, our newest mentor!`,
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
