import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupOKK } from 'src/entities/other/GroupOKK';
import { In, Repository } from 'typeorm';
import { Mentor } from 'src/entities/users/panitia/Mentor';
import { Mentee } from 'src/entities/users/external/Mentee';
import { BaseUser } from 'src/modules/types/BaseUser.type';
import { MainRole } from 'src/entities/users/types/entity.types';

@Injectable()
export class MentoringService {
  constructor(
    @InjectRepository(GroupOKK)
    private readonly groupRepository: Repository<GroupOKK>,
    @InjectRepository(Mentor)
    private readonly mentorRepository: Repository<Mentor>,
    @InjectRepository(Mentee)
    private readonly menteeRepository: Repository<Mentee>,
  ) {}
  // Mentor endpoints
  async findAllMentors() {
    try {
      return await this.mentorRepository.find({});
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to find all mentors...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMentor(body: BaseUser) {
    try {
      let { role } = body;
      role = MainRole.MENTOR;
      const mentor = await this.mentorRepository.create({
        ...body,
        role: role,
      });
      return await this.mentorRepository.save(mentor);
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Failed to create mentor...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // Mentee endpoints
  async findAllMentee() {
    try {
      return await this.menteeRepository.find({});
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Failed to create mentor...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMentee(body: BaseUser & { jalur_masuk: string }) {
    try {
      let { role } = body;
      role = MainRole.NON_STAFF;
      const mentee = await this.menteeRepository.create({
        ...body,
        role: role,
      });
      return await this.menteeRepository.save(mentee);
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Failed to create mentor...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Group endpoints
  async findAllGroups() {
    try {
      return await this.groupRepository.find({});
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to find all groups...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createGroup(group_name: string, mentorId: number, menteeIds: number[]) {
    try {
      const [mentor, mentees] = await Promise.all([
        this.mentorRepository.findOne({ where: { id: mentorId } }),
        this.menteeRepository.find({ where: { id: In(menteeIds) } }),
      ]);
      const newGroup = await this.groupRepository.create({
        group_name: group_name,
        mentor: mentor,
        mentee: mentees,
      });
      console.log(newGroup);
      return await this.groupRepository.save(newGroup);
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Failed to create group...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteAllGroups() {
    try {
      return await this.groupRepository.delete({});
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete all groups...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
