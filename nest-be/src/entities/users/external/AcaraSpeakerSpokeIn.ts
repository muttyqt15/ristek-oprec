import { Acara } from 'src/entities/other/Acara';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Speaker } from './Speaker';

@Entity()
export class AcaraSpeakerSpokeIn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Acara, (acara) => acara.speakers_spoke_in)
  acara: Acara;

  @ManyToOne(() => Speaker, (speaker) => speaker.acara_spoke_in)
  speaker: Speaker;
}
