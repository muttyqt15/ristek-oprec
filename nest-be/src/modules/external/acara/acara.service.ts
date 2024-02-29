import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Acara } from 'src/entities/other/Acara';
import { Repository } from 'typeorm';
import { CreateAcaraParams } from './types';
import { PaketSponsor, Sponsor } from 'src/entities/users/external/Sponsor';
import { Speaker } from 'src/entities/users/external/Speaker';
import { hashPassword } from 'src/utils/hash';
import { CreateSpeakerParams, CreateSponsorParams } from './types/types';
import { CreateSponsorDto } from './dtos/CreateSponsor.dto';

@Injectable()
export class AcaraService {
  constructor(
    @InjectRepository(Acara)
    private readonly acaraRepository: Repository<Acara>,
    @InjectRepository(Sponsor)
    private readonly sponsorRepository: Repository<Sponsor>,
    @InjectRepository(Speaker)
    private readonly speakerRepository: Repository<Speaker>,
  ) {}

  // Speaker services
  async findSpeakerById(id: number) {
    return await this.speakerRepository.findOne({ where: { id } });
  }
  async getAllSpeaker() {
    return await this.speakerRepository.find({
      select: {
        name: true,
        expert_field: true,
      },
    });
  }

  async getSpeakersByExpertField(field: string) {
    return await this.speakerRepository.find({
      where: {
        expert_field: field,
      },
    });
  }

  // TODO: PRIVATE: ONLY NON LOGGED IN USERS CAN
  async createSpeaker(bodyDetails: CreateSpeakerParams) {
    try {
      const existingSpeaker = await this.speakerRepository.find({
        where: {
          name: bodyDetails.name,
        },
      });
      if (existingSpeaker.length > 0) {
        throw new HttpException(
          `${bodyDetails.name} already exists in Speaker database`,
          HttpStatus.CONFLICT,
        );
      }

      // If no existing users with the same role, proceed with creating the new user
      const hashedPassword = await hashPassword(bodyDetails.speaker_code);
      const newSpeaker: CreateSpeakerParams =
        await this.speakerRepository.create({
          name: bodyDetails.name,
          expert_field: bodyDetails.expert_field,
          speaker_code: hashedPassword,
        });
      return await this.speakerRepository.save(newSpeaker);
    } catch (err) {
      // Handle specific errors separately
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        // If it's an unexpected error, throw a generic server error
        console.error(err);
        throw new HttpException(
          'Error creating Anggota Speaker',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async updateSpeakerById(
    speakerId: number,
    updateDetails: Partial<CreateSpeakerParams>,
  ) {
    try {
      const updatedSpeaker = await this.speakerRepository.update(
        { id: speakerId },
        updateDetails,
      );
      if (updatedSpeaker.affected === 0) {
        throw new HttpException(
          'Anggota Speaker not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedSpeaker;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to update Anggota Speaker',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteAllSpeaker() {
    let status = false;
    try {
      await this.speakerRepository.delete({});
      status = true;
    } catch (err) {
      console.error(err);
    }
    return status;
  }

  async deleteSpeakerById(id: number) {
    try {
      const existingSpeaker = await this.speakerRepository.findOne({
        where: { id },
      });
      await this.speakerRepository.delete({ id: existingSpeaker.id });
    } catch (err) {
      console.error(err);
    }
  }
  // Sponsor services
  async findSponsorById(id: number) {
    return await this.sponsorRepository.findOne({ where: { id } });
  }
  async getAllSponsor() {
    return await this.sponsorRepository.find({
      select: {
        brand_name: true,
        paket_sponsor: true,
      },
    });
  }

  async getSponsorsByPaket(paket: PaketSponsor) {
    return await this.sponsorRepository.find({
      where: {
        paket_sponsor: paket,
      },
    });
  }

  async createSponsor(bodyDetails: CreateSponsorParams) {
    try {
      const existingSponsor = await this.sponsorRepository.find({
        where: {
          brand_name: bodyDetails.brand_name,
        },
      });
      if (existingSponsor.length > 0) {
        throw new HttpException(
          `${bodyDetails.brand_name} already exist in Sponsor database`,
          HttpStatus.CONFLICT,
        );
      }

      // If no existing users with the same role, proceed with creating the new user
      const hashedPassword = await hashPassword(bodyDetails.brand_code);
      const newSponsor = await this.sponsorRepository.create({
        brand_name: bodyDetails.brand_name,
        brand_code: hashedPassword,
      });
      return await this.sponsorRepository.save(newSponsor);
    } catch (err) {
      // Handle specific errors separately
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        // If it's an unexpected error, throw a generic server error
        console.error(err);
        throw new HttpException(
          'Error creating Anggota sponsor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async updateSponsorById(
    sponsor_id: number,
    updateDetails: Partial<CreateSponsorDto>,
  ) {
    try {
      const updatedSponsor = await this.sponsorRepository.update(
        { id: sponsor_id },
        updateDetails,
      );
      if (updatedSponsor.affected === 0) {
        throw new HttpException(
          'Anggota sponsor not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedSponsor;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to update Anggota sponsor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteAllSponsor() {
    let status = false;
    try {
      await this.sponsorRepository.delete({});
      status = true;
    } catch (err) {
      console.error(err);
    }
    return status;
  }

  async deleteSponsorById(id: number) {
    try {
      const existingSponsor = await this.sponsorRepository.findOne({
        where: { id },
      });
      await this.sponsorRepository.delete({ id: existingSponsor.id });
    } catch (err) {
      console.error(err);
    }
  }
  // Create an event
  async createAcara(acaraDetails: CreateAcaraParams) {
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
  async getAllAcara() {
    return await this.acaraRepository.find({});
  }

  // Get an event by ID
  async getAcaraById(acaraId: number) {
    const acara = await this.acaraRepository.findOne({
      where: { id: acaraId },
    });
    if (!acara) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    return acara;
  }

  // Update an event
  async updateAcara(acaraId: number, updateParams: Partial<CreateAcaraParams>) {
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

  async deleteAcaraById(acaraId: number) {
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
