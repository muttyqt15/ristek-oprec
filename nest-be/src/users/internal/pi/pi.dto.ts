import { IsEnum, IsNotEmpty, IsString } from 'class-validator'; // Import validators as per your requirements
import { PengurusIntiRole } from 'src/entities/users/types/pi.types';
import { BaseUserDto } from 'src/users/types/BaseUser.dto';

export class CreatePiDto extends BaseUserDto {
  @IsNotEmpty()
  @IsEnum(PengurusIntiRole)
  pi_role: PengurusIntiRole;
}

export class UpdatePIDto {
  @IsNotEmpty()
  @IsString()
  name?: string;
}
