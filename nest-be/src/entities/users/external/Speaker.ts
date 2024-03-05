import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AcaraSpeakerSpokeIn } from './AcaraSpeakerSpokeIn';

@Entity({ name: 'speaker' })
export class Speaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  expert_field: string;

  @Column({ select: false })
  speaker_code: string;

  @OneToMany(
    () => AcaraSpeakerSpokeIn,
    (acara_spoke_in) => acara_spoke_in.speaker,
  )
  acara_spoke_in: AcaraSpeakerSpokeIn[];
}
