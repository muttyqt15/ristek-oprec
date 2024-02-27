import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PengurusInti } from 'src/entities/users/panitia/PengurusInti';
import { hashPassword } from 'src/utils/hash';
import { Repository } from 'typeorm';
import { CreatePIParams } from './pi.types';

@Injectable()
export class PiService {
  constructor(
    @InjectRepository(PengurusInti)
    private readonly pengurusIntiRepository: Repository<PengurusInti>,
  ) {}

  async createPengurusInti(bodyDetails: CreatePIParams) {
    try {
      const existingPI = await this.pengurusIntiRepository.find({
        where: {
          pi_role: bodyDetails.pi_role,
        },
      });
      if (existingPI.length > 0) {
        throw new HttpException(
          'Users with the same role already exist',
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
}
