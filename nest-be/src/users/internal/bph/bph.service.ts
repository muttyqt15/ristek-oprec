import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnggotaBPH } from 'src/entities/users/panitia/AnggotaBPH';
import { Repository } from 'typeorm';
import { CreateBPHParams } from './bph.types';
import { hashPassword } from 'src/utils/hash';
import { UpdateBPHDto } from './bph.dto';

@Injectable()
export class BphService {
  constructor(
    @InjectRepository(AnggotaBPH)
    private readonly bphRepository: Repository<AnggotaBPH>,
  ) {}

  async getAllUser() {
    return await this.bphRepository.find();
  }

  async getByName(name: string) {
    return await this.bphRepository.findOne({ where: { name: name } });
  }

  // TODO: PRIVATE: ONLY NON LOGGED IN USERS CAN
  async create(bodyDetails: CreateBPHParams) {
    try {
      const existingBPH = await this.bphRepository.find({
        where: {
          name: bodyDetails.name,
        },
      });
      if (existingBPH.length > 0) {
        throw new HttpException(
          'Users with the same role already exist',
          HttpStatus.CONFLICT,
        );
      }

      // If no existing users with the same role, proceed with creating the new user
      const hashedPassword = await hashPassword(bodyDetails.password);
      const newBPH = await this.bphRepository.create({
        name: bodyDetails.name,
        batch: bodyDetails.batch,
        password: hashedPassword,
        role: bodyDetails.role,
        divisi: bodyDetails.divisi,
      });
      return await this.bphRepository.save(newBPH);
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
  async update(BPH_id: number, updateDetails: UpdateBPHDto) {
    try {
      const updatedBPH = await this.bphRepository.update(
        { id: BPH_id },
        updateDetails,
      );
      if (updatedBPH.affected === 0) {
        throw new HttpException(
          'Pengurus Inti not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return await updatedBPH;
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
      await this.bphRepository.delete({});
      status = true;
    } catch (err) {
      console.error(err);
    }
    return status;
  }
}
