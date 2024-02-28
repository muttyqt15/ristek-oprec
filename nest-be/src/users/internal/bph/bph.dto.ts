import { IsEnum, IsNotEmpty, IsString } from 'class-validator'; // Import validators as per your requirements
import { BPH_ROLE, DivisiBPH } from 'src/entities/users/types/bph.types';
import { BaseUserDto } from 'src/users/types/BaseUser.dto';

export class CreateBPHDto extends BaseUserDto {
  @IsNotEmpty()
  @IsEnum(DivisiBPH)
  divisi: DivisiBPH;

  @IsNotEmpty()
  @IsEnum(BPH_ROLE)
  bph_role: BPH_ROLE;
}

export class UpdateBPHDto {
  @IsNotEmpty()
  @IsString()
  name?: string;
  divisi?: DivisiBPH;
  bph_role?: BPH_ROLE;
}
