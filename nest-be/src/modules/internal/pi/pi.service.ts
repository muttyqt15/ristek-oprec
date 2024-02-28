import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PengurusInti } from 'src/entities/users/panitia/PengurusInti';
import { hashPassword } from 'src/utils/hash';
import { Repository } from 'typeorm';
import { UpdatePIDto } from './pi.dto';
import { CreatePIParams } from './types';

@Injectable()
export class PiService {
  constructor(
    @InjectRepository(PengurusInti)
    private readonly pengurusIntiRepository: Repository<PengurusInti>,
  ) {}

  async getAllUser() {
    return await this.pengurusIntiRepository.find({
      select: {
        name: true,
        pi_role: true,
      },
    });
  }

  async getByName(name: string) {
    return await this.pengurusIntiRepository.findOne({ where: { name: name } });
  }

  // TODO: PRIVATE: ONLY NON LOGGED IN USERS CAN
  async create(bodyDetails: CreatePIParams) {
    try {
      const existingPI = await this.pengurusIntiRepository.find({
        where: {
          pi_role: bodyDetails.pi_role,
        },
      });
      console.log('Hello!');
      console.log(existingPI, existingPI.length);
      if (existingPI.length > 0) {
        throw new HttpException(
          'Users with the same role already exist?!',
          HttpStatus.CONFLICT,
        );
      }

      // If no existing users with the same role, proceed with creating the new user
      const hashedPassword = await hashPassword(bodyDetails.password);
      const newPI = await this.pengurusIntiRepository.create({
        name: bodyDetails.name,
        batch: bodyDetails.batch,
        password: hashedPassword,
        role: bodyDetails.role,
        pi_role: bodyDetails.pi_role,
      });
      return await this.pengurusIntiRepository.save(newPI);
    } catch (err) {
      // Handle specific errors separately
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        // If it's an unexpected error, throw a generic server error
        console.error(err);
        throw new HttpException(
          'Error creating Pengurus Inti',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async update(pi_id: number, updateDetails: UpdatePIDto) {
    try {
      const updatedPi = await this.pengurusIntiRepository.update(
        { id: pi_id },
        updateDetails,
      );
      if (updatedPi.affected === 0) {
        throw new HttpException(
          'Pengurus Inti not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return await updatedPi;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to update Pengurus Inti',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteAll() {
    let status = false;
    try {
      await this.pengurusIntiRepository.delete({});
      status = true;
    } catch (err) {
      console.error(err);
    }
    return status;
  }

  async findById(id: number) {
    try {
      const pi = await this.pengurusIntiRepository.findOne({ where: { id } });
      return pi;
    } catch (error) {
      console.error(error);
    }
  }
}
