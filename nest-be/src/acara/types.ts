import { AcaraImportance } from 'src/entities/acara/types';
import { DivisiBPH } from 'src/entities/users/types/bph.types';

export type CreateAcaraParams = {
  // Kebetulan sama dengan dto
  nama_acara: string;
  location: string;
  duration: number;
  importance?: AcaraImportance;
  panitia_working?: DivisiBPH[];
};
