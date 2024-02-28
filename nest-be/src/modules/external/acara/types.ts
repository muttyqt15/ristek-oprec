import { AcaraImportance } from 'src/entities/other/types';

export type CreateAcaraParams = {
  // Kebetulan sama dengan dto
  nama_acara: string;
  location: string;
  duration: number;
  in_progress: boolean;
  importance?: AcaraImportance;
};
