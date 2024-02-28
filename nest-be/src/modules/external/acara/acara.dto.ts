import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { AcaraImportance } from 'src/entities/other/types';

export class CreateAcaraDto {
  @IsNotEmpty()
  nama_acara: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsBoolean()
  in_progress: boolean;

  // TODO: Add sponsor

  importance?: AcaraImportance;

  // panitia_working?: DivisiBPH[];
}

export class UpdateAcaraDto {
  nama_acara?: string;

  location?: string;

  duration?: number;

  in_progress?: boolean;

  // TODO: Add sponsor

  importance?: AcaraImportance;

  // panitia_working?: DivisiBPH[];
}
