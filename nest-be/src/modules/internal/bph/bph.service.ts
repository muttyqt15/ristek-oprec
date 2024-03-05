import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnggotaBPH } from 'src/entities/users/panitia/AnggotaBPH';
import { Repository } from 'typeorm';
import { CreateBPHParams } from './bph.types';
import { hashPassword } from 'src/utils/hash';
import { BPH_ROLE, DivisiBPH } from 'src/entities/users/types/bph.types';
import { CreateBPHDto } from './bph.dto';

@Injectable()
export class BphService {
  constructor(
    @InjectRepository(AnggotaBPH)
    private readonly bphRepository: Repository<AnggotaBPH>,
  ) {}

  async findById(id: number) {
    const bph = await this.bphRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        batch: true,
        divisi: true,
        bph_role: true,
      },
    });
    if (!bph) {
      throw new HttpException('No member found!', HttpStatus.NOT_FOUND);
    }
    return bph;
  }
  async getAllUser() {
    return await this.bphRepository.find({
      select: {
        id: true,
        name: true,
        divisi: true,
        bph_role: true,
      },
    });
  }

  async getByRole(level: BPH_ROLE, divisi: DivisiBPH) {
    return await this.bphRepository.findOne({
      where: {
        divisi: divisi,
        bph_role: level,
      },
    });
  }
  async getByName(name: string) {
    return await this.bphRepository.findOne({ where: { name: name } });
  }

  async create(bodyDetails: CreateBPHParams) {
    try {
      const existingBPH = await this.bphRepository.find({
        where: {
          name: bodyDetails.name,
        },
      });
      if (existingBPH.length > 0) {
        throw new HttpException(
          'Users with the same role and name already exist',
          HttpStatus.CONFLICT,
        );
      }

      if (bodyDetails.bph_role === BPH_ROLE.PJ) {
        const existingPJ = await this.bphRepository.find({
          where: {
            divisi: bodyDetails.divisi,
            bph_role: BPH_ROLE.PJ,
          },
        });
        if (existingPJ.length > 0) {
          throw new HttpException('PJ already exists!', HttpStatus.CONFLICT);
        }
      } else if (bodyDetails.bph_role === BPH_ROLE.WAPJ) {
        const existingPJ = await this.bphRepository.find({
          where: {
            divisi: bodyDetails.divisi,
            bph_role: BPH_ROLE.WAPJ,
          },
        });
        if (existingPJ.length > 1) {
          throw new HttpException(
            'Both Wakil PJ already exists!',
            HttpStatus.CONFLICT,
          );
        }
      }

      // If no existing users with the same role, proceed with creating the new user
      const hashedPassword = await hashPassword(bodyDetails.password);
      const newBPH = await this.bphRepository.create({
        name: bodyDetails.name,
        batch: bodyDetails.batch,
        password: hashedPassword,
        role: bodyDetails.role,
        divisi: bodyDetails.divisi,
        bph_role: bodyDetails.bph_role,
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
          'Error creating Anggota BPH',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async update(BPH_id: number, updateDetails: Partial<CreateBPHDto>) {
    try {
      const updatedBPH = await this.bphRepository.update(
        { id: BPH_id },
        updateDetails,
      );
      if (updatedBPH.affected === 0) {
        throw new HttpException('Anggota BPH not found', HttpStatus.NOT_FOUND);
      }
      return await updatedBPH;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to update Anggota BPH',
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

  async delete(id: number) {
    try {
      const existingUser = await this.bphRepository.findOne({ where: { id } });
      await this.bphRepository.delete({ id: existingUser.id });
    } catch (err) {
      console.error(err);
    }
  }
}
