import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'; // Import validators as per your requirements
import { MainRole } from 'src/entities/users/types/entity.types';
import { PengurusIntiRole } from 'src/entities/users/types/pi.types';

export class CreatePiDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  batch: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(MainRole)
  role: MainRole;

  @IsNotEmpty()
  @IsEnum(PengurusIntiRole)
  pi_role: PengurusIntiRole;
}
