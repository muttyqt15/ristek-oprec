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
    const { list_hadir_ids } = rapatDetails;
    const bph_list: AnggotaBPH[] = []; // Initialize bph_list as an empty array

    // Using Promise.all() to asynchronously fetch all AnggotaBPH entities
    await Promise.all(
      list_hadir_ids.map(async (id) => {
        const bph = await this.bphService.findById(id); // Wait for the promise to resolve
        if (bph) {
          // Ensure that the entity is retrieved successfully
          bph_list.push(bph); // Push the retrieved AnggotaBPH entity into bph_list
        } else {
          // Handle the case where the entity with the given ID doesn't exist
          console.error(`AnggotaBPH with ID ${id} not found.`);
        }
      }),
    );
    console.log('Frombph list!', bph_list);
    const Rapat = this.rapatRepository.create({
      ...rapatDetails,
      list_hadir: bph_list,
    });
    return await this.rapatRepository.save(Rapat);
  }

  // Get all Rapats
  async getAllRapat() {
    return await this.rapatRepository.find({});
  }

  // Get an Rapat by ID
  async getRapatById(RapatId: number) {
    const Rapat = await this.rapatRepository.findOne({
      where: { id: RapatId },
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
