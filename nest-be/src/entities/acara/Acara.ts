import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'enum', enum: AcaraImportance, default: AcaraImportance.LOW })
  importance: AcaraImportance;

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
