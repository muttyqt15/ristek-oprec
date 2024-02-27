import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Acara } from 'src/entities/acara/Acara';
import { Repository } from 'typeorm';
import { CreateAcaraParams } from './types';

@Injectable()
export class AcaraService {
  constructor(
    @InjectRepository(Acara)
    private readonly acaraRepository: Repository<Acara>,
  ) {}

  async createAcara(acaraDetails: CreateAcaraParams) {
    const existingAcara = await this.acaraRepository.find({
      where: { nama_acara: acaraDetails.nama_acara },
    });
    console.log(existingAcara, existingAcara.length);
    if (existingAcara.length > 0) {
      throw new HttpException(
        'There is already an event with the same name!',
        HttpStatus.CONFLICT,
      );
    }
    const acara = await this.acaraRepository.create({
      nama_acara: acaraDetails.nama_acara,
      location: acaraDetails.location,
      duration: acaraDetails.duration,
      importance: acaraDetails.importance,
      //   panitia_working: acaraDetails.panitia_working,
    });
    return await this.acaraRepository.save(acara);
  }
}
