import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Acara } from 'src/entities/other/Acara';
import { Repository } from 'typeorm';
import { CreateAcaraParams } from './types';

@Injectable()
export class AcaraService {
  constructor(
    @InjectRepository(Acara)
    private readonly acaraRepository: Repository<Acara>,
  ) {}

  // Create an event
  async create(acaraDetails: CreateAcaraParams) {
    const existingAcara = await this.acaraRepository.findOne({
      where: { nama_acara: acaraDetails.nama_acara },
    });
    if (existingAcara) {
      throw new HttpException(
        'There is already an event with the same name!',
        HttpStatus.CONFLICT,
      );
    }
    const acara = this.acaraRepository.create(acaraDetails);
    return await this.acaraRepository.save(acara);
  }

  // Get all events
  async getAll() {
    return await this.acaraRepository.find();
  }

  // Get an event by ID
  async getById(acaraId: number) {
    const acara = await this.acaraRepository.findOne({
      where: { id: acaraId },
    });
    if (!acara) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    return acara;
  }

  // Update an event
  async update(acaraId: number, updateParams: Partial<CreateAcaraParams>) {
    const existingAcara = await this.acaraRepository.findOne({
      where: { id: acaraId },
    });
    if (!existingAcara) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    await this.acaraRepository.update(acaraId, updateParams);
    return await this.acaraRepository.findOne({
      where: { id: acaraId },
    });
  }

  async delete(acaraId: number) {
    const existingAcara = await this.acaraRepository.findOne({
      where: { id: acaraId },
    });
    if (!existingAcara) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    await this.acaraRepository.delete(acaraId);
    return existingAcara;
  }
}
