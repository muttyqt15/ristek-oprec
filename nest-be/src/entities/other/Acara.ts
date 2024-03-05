import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AcaraSpeakerSpokeIn } from '../users/external/AcaraSpeakerSpokeIn';
import { Sponsorship } from '../users/external/Sponsorship';
import { AcaraImportance } from './types';

@Entity({ name: 'acara' })
export class Acara {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nama_acara: string;

  @Column()
  location: string;

  @Column() // in hours
  duration: number;

  @Column({ default: false })
  in_progress?: boolean;

  @Column({ type: 'enum', enum: AcaraImportance, default: AcaraImportance.LOW })
  importance?: AcaraImportance;

  // @ManyToMany(() => Speaker, { nullable: true })
  // @JoinTable({ name: 'speaker_acara' }) // Only on this side
  // speakers?: Speaker[];
  @OneToMany(() => AcaraSpeakerSpokeIn, (assi) => assi.acara, {
    nullable: true,
  })
  speakers_spoke_in?: AcaraSpeakerSpokeIn[];

  @OneToMany(() => Sponsorship, (sponsorship) => sponsorship.acara, {
    nullable: true,
  })
  @JoinColumn()
  sponsorships?: Sponsorship[];

  // @Column('simple-array', {
  //   nullable: true,
  //   default: [
  //     DivisiBPH.PROJECT,
  //     //   DivisiBPH.DEKORASI_DAN_WARDROBE,
  //     //   DivisiBPH.LOGISTIK,
  //     //   DivisiBPH.MEDIS,
  //     DivisiBPH.MEDIA_INFORMASI,
  //     DivisiBPH.PERIZINAN,
  //     //   DivisiBPH.VISUAL_DESIGN_DAN_DOKUMENTASI,
  //   ],
  // })
  // panitia_working: DivisiBPH[];
}
