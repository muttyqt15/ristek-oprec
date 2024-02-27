import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DivisiBPH } from '../users/types/bph.types';
import { AcaraImportance } from './types';

@Entity({ name: 'acara' })
export class Acara {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nama_acara: string;

  @Column()
  location: string;

  // Format: YYYY-MM-DD%%THH:mm:ss.sssZ
  @Column({ type: 'date' })
  startAt: Date;

  @Column({ type: 'date' })
  endAt: Date;

  @Column({ default: AcaraImportance.LOW })
  importance: AcaraImportance;

  @Column('simple-array', { nullable: true })
  panitia_working: DivisiBPH[];

  constructor() {
    this.panitia_working = [
      DivisiBPH.PROJECT,
      //   DivisiBPH.DEKORASI_DAN_WARDROBE,
      //   DivisiBPH.LOGISTIK,
      //   DivisiBPH.MEDIS,
      DivisiBPH.MEDIA_INFORMASI,
      DivisiBPH.PERIZINAN,
      //   DivisiBPH.VISUAL_DESIGN_DAN_DOKUMENTASI,
    ];

    // Method to update panitia_working based on input
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function updatePanitiaWorking(value: string | DivisiBPH[]) {
      if (Array.isArray(value)) {
        // If array provided, use it directly
        this.panitia_working = value;
      } else if (value === 'all') {
        // If "all" provided, include all enums
        this.panitia_working = Object.values(DivisiBPH);
      } else {
        // Otherwise, use default value
        this.panitia_working = [
          DivisiBPH.PROJECT,
          DivisiBPH.MEDIA_INFORMASI,
          DivisiBPH.PERIZINAN,
        ];
      }
    }
  }
}
