import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Acara } from 'src/entities/other/Acara';
import { In, Repository } from 'typeorm';
import { CreateAcaraParams } from './types';
import { Sponsor } from 'src/entities/users/external/Sponsor';
import { Speaker } from 'src/entities/users/external/Speaker';
import { hashPassword } from 'src/utils/hash';
import { CreateSpeakerParams, CreateSponsorParams } from './types/types';
import { Sponsorship } from 'src/entities/users/external/Sponsorship';
import { AcaraSpeakerSpokeIn } from 'src/entities/users/external/AcaraSpeakerSpokeIn';

@Injectable()
export class AcaraService {
  constructor(
    @InjectRepository(Acara)
    private readonly acaraRepository: Repository<Acara>,
    @InjectRepository(Sponsor)
    private readonly sponsorRepository: Repository<Sponsor>,
    @InjectRepository(Speaker)
    private readonly speakerRepository: Repository<Speaker>,
    @InjectRepository(Sponsorship)
    private readonly sponsorshipRepository: Repository<Sponsorship>,
    @InjectRepository(AcaraSpeakerSpokeIn)
    private readonly acaraSpeakerRepository: Repository<AcaraSpeakerSpokeIn>,
  ) {}

  // Speaker services
  async getSpeakerById(id: number) {
    const speaker = await this.speakerRepository.findOne({ where: { id } });
    if (!speaker) {
      throw new HttpException('No speaker found!', HttpStatus.NOT_FOUND);
    }
    return speaker;
  }
  async getAllSpeaker() {
    return await this.speakerRepository.find({
      relations: ['acara_spoke_in', 'acara_spoke_in.acara'],
      select: {
        name: true,
        expert_field: true,
        acara_spoke_in: {
          acara: {
            nama_acara: true,
          },
        },
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

  async createSpeaker(bodyDetails: CreateSpeakerParams) {
    try {
      const existingSpeaker = await this.speakerRepository.findOne({
        where: {
          name: bodyDetails.name,
        },
        relations: ['acara_spoke_in', 'acara_spoke_in.acara'],
      });
      if (existingSpeaker) {
        throw new HttpException(
          `${bodyDetails.name} already exists in the speaker database!`,
          HttpStatus.CONFLICT,
        );
      }

      // If no existing speaker with the same name, proceed with creating the new speaker
      const hashedPassword = await hashPassword(bodyDetails.speaker_code);
      const acaraExists = await this.acaraRepository.find({
        where: {
          id: In(bodyDetails.acaraIds),
        },
      });
      if (acaraExists.length == 0) {
        throw new HttpException('No acara found!', HttpStatus.NOT_FOUND);
      }

      const newSpeaker: Speaker = this.speakerRepository.create({
        name: bodyDetails.name,
        expert_field: bodyDetails.expert_field,
        speaker_code: hashedPassword,
      });

      await this.speakerRepository.save(newSpeaker); // Save the new speaker entity
      for (const acara of acaraExists) {
        const acaraSpeaker = this.acaraSpeakerRepository.create({
          acara: acara,
          speaker: newSpeaker,
        });
        await this.acaraSpeakerRepository.save(acaraSpeaker); // Simpan sponsorship ke basis data
      }

      return newSpeaker;
    } catch (err) {
      // Handle specific errors separately
      if (err instanceof HttpException) {
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error creating Speaker...',
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
        throw new HttpException('Speaker not found', HttpStatus.NOT_FOUND);
      }
      return updatedSpeaker;
    } catch (error) {
      // Handle specific errors separately
      if (error instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw error;
      } else {
        console.error(error);
        throw new HttpException(
          'Error updating speaker...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async deleteSpeakerById(id: number) {
    try {
      const existingSpeaker = await this.speakerRepository.findOne({
        where: { id },
      });
      await this.speakerRepository.delete({ id: existingSpeaker.id });
    } catch (err) {
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error deleting speaker...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  // // Sponsor services
  async findSponsorById(id: number) {
    try {
      return await this.sponsorRepository.findOne({
        where: { id },
        relations: ['sponsorships'],
      });
    } catch (err) {
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error finding sponsor...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async getAllSponsor() {
    try {
      return await this.sponsorRepository.find({
        relations: [
          'sponsorships',
          'sponsorships.sponsor',
          'sponsorships.acara',
        ],
        select: {
          brand_name: true,
          sponsorships: {
            package: true,
            sponsor: {
              brand_name: true,
            },
            acara: {
              nama_acara: true,
              location: true,
              importance: true,
            },
          },
        },
      });
    } catch (err) {
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error retrieving sponsors...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
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
      const acaraExists = await this.acaraRepository.find({
        where: {
          id: In(bodyDetails.acaraIds),
        },
      });
      if (acaraExists.length == 0) {
        throw new HttpException('No acara found!', HttpStatus.NOT_FOUND);
      }

      // If no existing users with the same role, proceed with creating the new user
      const hashedPassword = await hashPassword(bodyDetails.brand_code);

      const newSponsor = this.sponsorRepository.create({
        brand_name: bodyDetails.brand_name,
        brand_code: hashedPassword,
      });
      await this.sponsorRepository.save(newSponsor); // Simpan sponsor baru ke basis data

      for (const acara of acaraExists) {
        const sponsorship = this.sponsorshipRepository.create({
          sponsor: newSponsor,
          acara: acara,
          package: bodyDetails.paket_sponsor,
        });
        await this.sponsorshipRepository.save(sponsorship); // Simpan sponsorship ke basis data
      }

      return newSponsor;
    } catch (err) {
      // Handle specific errors separately
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error creating sponsor...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async updateSponsorById(
    sponsorId: number,
    updateDetails: Partial<CreateSponsorParams>,
  ) {
    try {
      const updatedSponsor = await this.sponsorRepository.update(
        { id: sponsorId },
        updateDetails,
      );
      if (updatedSponsor.affected === 0) {
        throw new HttpException('Sponsor not found!', HttpStatus.NOT_FOUND);
      }
      return updatedSponsor;
    } catch (err) {
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error creating sponsor...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async deleteSponsorById(id: number) {
    try {
      const existingSponsor = await this.sponsorRepository.findOne({
        where: { id },
      });
      await this.sponsorRepository.delete({ id: existingSponsor.id });
    } catch (err) {
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error deleting sponsor...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  // Create an event
  async createAcara(acaraDetails: CreateAcaraParams) {
    try {
      const existingAcara = await this.acaraRepository.findOne({
        where: { nama_acara: acaraDetails.nama_acara },
        relations: ['sponsorships', 'speakers_spoke_in'],
      });
      if (existingAcara) {
        throw new HttpException(
          'There is already an event with the same name!',
          HttpStatus.CONFLICT,
        );
      }

      const acara = this.acaraRepository.create(acaraDetails);
      return await this.acaraRepository.save(acara);
    } catch (err) {
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error creating event...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  // Get all events
  async getAllAcara() {
    return await this.acaraRepository.find({
      relations: [
        'sponsorships',
        'speakers_spoke_in',
        'sponsorships.sponsor',
        'speakers_spoke_in.speaker',
      ],
      select: {
        nama_acara: true,
        importance: true,
        location: true,
        sponsorships: {
          package: true,
          sponsor: {
            brand_name: true,
          },
        },
        speakers_spoke_in: {
          id: true,
          speaker: {
            name: true,
          },
        },
      },
    });
  }

  // Get an event by ID
  async getAcaraById(acaraId: number) {
    try {
      const acara = await this.acaraRepository.findOne({
        where: { id: acaraId },
        relations: [
          'sponsorships',
          'sponsorships.sponsor',
          'speakers_spoke_in',
          'speakers_spoke_in.speaker',
        ],
        // select: {
        //   nama_acara: true,
        //   importance: true,
        //   location: true,
        //   sponsorships: {
        //     package: true,
        //     sponsor: {
        //       brand_name: true,
        //     },
        //   },
        //   speakers_spoke_in: {
        //     id: true,
        //     speaker: {
        //       name: true,
        //     },
        //   },
        // },
      });
      if (!acara) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return acara;
    } catch (err) {
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error getting event...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  // Update an event
  async updateAcara(acaraId: number, updateParams: Partial<CreateAcaraParams>) {
    try {
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
    } catch (err) {
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error updating event...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async deleteAcaraById(acaraId: number) {
    try {
      const existingAcara = await this.acaraRepository.findOne({
        where: { id: acaraId },
      });
      if (!existingAcara) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      await this.acaraRepository.delete(acaraId);
      return existingAcara;
    } catch (err) {
      if (err instanceof HttpException) {
        // If it's a known conflict error, rethrow the same error
        throw err;
      } else {
        console.error(err);
        throw new HttpException(
          'Error getting event...',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
