import { IsNotEmpty, IsNumber } from 'class-validator';
import { AcaraImportance } from 'src/entities/acara/types';

export class CreateAcaraDto {
  @IsNotEmpty()
  nama_acara: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  importance?: AcaraImportance;

  // panitia_working?: DivisiBPH[];
}
