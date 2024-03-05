import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DivisiBPH } from '../users/types/bph.types';
import { AnggotaBPH } from '../users/panitia/AnggotaBPH';

@Entity({ name: 'rapat' })
export class Rapat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rapat_name: string;

  @Column()
  divisi: DivisiBPH;

  @Column()
  waktu: string; // "17:00"

  @Column()
  location: string;

  @Column({ nullable: true, default: 'important stuff!' })
  agenda?: string;

  @ManyToMany(() => AnggotaBPH, (bph) => bph.rapat_dihadiri)
  @JoinTable({ name: 'anggotalist_rapatlist' })
  list_hadir: AnggotaBPH[];
}
