import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rapat } from 'src/entities/other/Rapat';
import { Repository } from 'typeorm';
import { CreateRapatParams } from './rapat.types';
import { BphService } from '../bph.service';
import { AnggotaBPH } from 'src/entities/users/panitia/AnggotaBPH';

@Injectable()
export class RapatService {
  constructor(
    @InjectRepository(Rapat)
    private readonly rapatRepository: Repository<Rapat>,
    private readonly bphService: BphService,
  ) {}

  async createRapat(rapatDetails: CreateRapatParams) {
    try {
      const { list_hadir_ids } = rapatDetails;
      const bph_list: AnggotaBPH[] = []; // Initialize bph_list as an empty array

      await Promise.all(
        list_hadir_ids.map(async (id) => {
          const bph = await this.bphService.findById(id);
          if (bph) {
            // Ensure that the entity is retrieved successfully
            bph_list.push(bph); // Push the retrieved AnggotaBPH entity into bph_list
          } else {
            // Handle the case where the entity with the given ID doesn't exist
            console.error(`AnggotaBPH with ID ${id} not found.`);
            throw new HttpException(
              `AnggotaBPH with ID ${id} not found.`,
              HttpStatus.NOT_FOUND,
            );
          }
        }),
      );
      const Rapat = await this.rapatRepository.create({
        // Sesat cok eslint hrsnya await emg diperlukan
        ...rapatDetails,
        list_hadir: bph_list,
      });
      return await this.rapatRepository.save(Rapat);
    } catch (err) {
      // Handle specific errors separately
      if (err instanceof HttpException) {
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error creating rapat...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  // Get all Rapats
  async getAllRapat() {
    return await this.rapatRepository.find({
      relations: ['list_hadir'],
      select: {
        id: true,
        rapat_name: true,
        agenda: true,
        divisi: true,
        list_hadir: {
          id: true,
          name: true,
          bph_role: true,
        },
      },
    });
  }

  // Get an Rapat by ID
  async getRapatById(RapatId: number) {
    const Rapat = await this.rapatRepository.findOne({
      where: { id: RapatId },
      relations: ['list_hadir'], // Includes list_hadir relation
    });
    if (!Rapat) {
      throw new HttpException('Rapat not found', HttpStatus.NOT_FOUND);
    }
    return Rapat;
  }

  // Update an Rapat
  async updateRapat(RapatId: number, updateParams: Partial<CreateRapatParams>) {
    const existingRapat = await this.rapatRepository.findOne({
      where: { id: RapatId },
    });
    if (!existingRapat) {
      throw new HttpException('Rapat not found', HttpStatus.NOT_FOUND);
    }
    await this.rapatRepository.update(RapatId, updateParams);
    return await this.rapatRepository.findOne({
      where: { id: RapatId },
    });
  }

  async deleteRapatById(RapatId: number) {
    const existingRapat = await this.rapatRepository.findOne({
      where: { id: RapatId },
    });
    if (!existingRapat) {
      throw new HttpException('Rapat not found', HttpStatus.NOT_FOUND);
    }
    await this.rapatRepository.delete(RapatId);
    return existingRapat;
  }
}
