import { IsEnum, IsNotEmpty } from 'class-validator';
import { DivisiBPH } from 'src/entities/users/types/bph.types';

export class CreateRapatDto {
  @IsNotEmpty()
  rapat_name: string;

  @IsNotEmpty()
  @IsEnum(DivisiBPH)
  divisi: DivisiBPH;

  @IsNotEmpty()
  waktu: string; // "17:00"

  @IsNotEmpty()
  location: string;

  agenda?: string;

  @IsNotEmpty() // Get ids
  list_hadir_ids: number[];
}
