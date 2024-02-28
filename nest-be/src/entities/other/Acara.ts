import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AcaraImportance } from './types';
import { Sponsor } from '../users/external/Sponsor';
import { Speaker } from '../users/external/Speaker';

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

  @ManyToMany(() => Sponsor, { nullable: true })
  @JoinTable() // Only on this side
  sponsors?: Sponsor[];

  @ManyToMany(() => Speaker, { nullable: true })
  @JoinTable() // Only on this side
  speakers?: Speaker[];

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
