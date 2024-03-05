import { Acara } from 'src/entities/other/Acara';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Speaker } from './Speaker';

@Entity()
export class AcaraSpeakerSpokeIn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Acara, (acara) => acara.speakers_spoke_in, {
    onDelete: 'CASCADE',
  })
  acara: Acara;

  @ManyToOne(() => Speaker, (speaker) => speaker.acara_spoke_in, {
    onDelete: 'CASCADE',
  })
  speaker: Speaker;
}
