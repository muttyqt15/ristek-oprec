import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DivisiBPH } from '../users/types/bph.types';
import { AnggotaBPH } from '../users/panitia/AnggotaBPH';

@Entity({ name: 'rapat' })
export class Rapat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  divisi: DivisiBPH;

  @Column()
  waktu: string; // "17:00"

  @Column()
  location: string;

  @Column()
  list_hadir: AnggotaBPH[];
}
