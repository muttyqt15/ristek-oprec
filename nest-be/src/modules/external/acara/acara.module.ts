import { Module } from '@nestjs/common';
import { AcaraService } from './acara.service';
import { AcaraController } from './acara.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acara } from 'src/entities/other/Acara';
import { Sponsor } from 'src/entities/users/external/Sponsor';
import { Speaker } from 'src/entities/users/external/Speaker';
import { SponsorsController } from './sponsor.controller';
import { Sponsorship } from 'src/entities/users/external/Sponsorship';
import { AcaraSpeakerSpokeIn } from 'src/entities/users/external/AcaraSpeakerSpokeIn';
import { SpeakersController } from './speaker.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Acara,
      Sponsor,
      Speaker,
      Sponsorship,
      AcaraSpeakerSpokeIn,
    ]),
  ],
  providers: [AcaraService],
  controllers: [AcaraController, SponsorsController, SpeakersController],
  exports: [AcaraService],
})
export class AcaraModule {}
