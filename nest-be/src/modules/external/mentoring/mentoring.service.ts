import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupOKK } from 'src/entities/other/GroupOKK';
import { In, Repository } from 'typeorm';
import { Mentor } from 'src/entities/users/panitia/Mentor';
import { Mentee } from 'src/entities/users/external/Mentee';
import { BaseUser } from 'src/modules/types/BaseUser.type';
import { MainRole } from 'src/entities/users/types/entity.types';
import { hashPassword } from 'src/utils/hash';

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
  async findMentorByName(name: string) {
    try {
      return await this.mentorRepository.findOne({ where: { name: name } });
    } catch (error) {
      console.error(error);
    }
  }

  async updateMentor(id: number, updateDetails: Partial<Mentor>) {
    try {
      const mentor = await this.mentorRepository.update(
        {
          id: id,
        },
        updateDetails,
      );
      if (mentor.affected === 0) {
        throw new HttpException('Mentor not found', HttpStatus.NOT_FOUND);
      }
      return mentor;
    } catch (error) {
      console.error(error);
    }
  }
  async createMentor(body: BaseUser) {
    try {
      let { role } = body;
      role = MainRole.MENTOR;
      const existingMentor = await this.mentorRepository.findOne({
        where: {
          name: body.name,
        },
      });
      if (existingMentor) {
        throw new HttpException(
          'Mentor already exists!',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await hashPassword(body.password);
      const mentor = await this.mentorRepository.create({
        ...body,
        role: role,
        password: hashedPassword,
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
  async findMenteeByName(name: string) {
    try {
      return await this.menteeRepository.findOne({ where: { name: name } });
    } catch (error) {
      console.error(error);
    }
  }
  async findMenteeById(id: number) {
    try {
      return await this.menteeRepository.findOne({ where: { id: id } });
    } catch (error) {
      console.error(error);
    }
  }
  async updateMentee(id: number, updateDetails: Partial<Mentee>) {
    try {
      const mentee = await this.menteeRepository.update(
        {
          id: id,
        },
        updateDetails,
      );
      if (mentee.affected === 0) {
        throw new HttpException('Mentor not found', HttpStatus.NOT_FOUND);
      }
      return mentee;
    } catch (error) {
      console.error(error);
    }
  }
  async createMentee(body: BaseUser & { jalur_masuk: string }) {
    try {
      let { role } = body;
      role = MainRole.NON_STAFF;
      const hashedPassword = await hashPassword(body.password);
      const mentee = await this.menteeRepository.create({
        ...body,
        role: role,
        password: hashedPassword,
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

  async findGroupByName(name: string) {
    try {
      return await this.groupRepository.find({ where: { group_name: name } });
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
      // For loop for validation
      mentees.forEach((mentee) => {
        if (mentee.group_okk) {
          throw new HttpException(
            `Mentee with ${mentee.id} (${mentee.name}) is already part of a group ${mentee.group_okk.group_name}!`,
            HttpStatus.UNAUTHORIZED,
          );
        } else if (mentee.mentor != undefined) {
          throw new HttpException(
            `Mentee with ${mentee.id} (${mentee.name}) can't have more than two mentors!`,
            HttpStatus.UNAUTHORIZED,
          );
        }
      });
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
