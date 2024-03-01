import { DivisiBPH } from 'src/entities/users/types/bph.types';

export type CreateRapatParams = {
  divisi: DivisiBPH;
  waktu: string; // "17:00"
  location: string;
  list_hadir_ids: number[];
};
