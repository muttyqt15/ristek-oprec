import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator'; // Import validators as per your requirements
import { BPH_ROLE, DivisiBPH } from 'src/entities/users/types/bph.types';
import { BaseUserDto } from 'src/modules/types/BaseUser.dto';

export class CreateBPHDto extends BaseUserDto {
  @IsNotEmpty()
  @IsEnum(DivisiBPH)
  divisi: DivisiBPH;

  @IsNotEmpty()
  @IsEnum(BPH_ROLE)
  bph_role: BPH_ROLE;
}

export class UpdateBPHDto extends PartialType(CreateBPHDto) {}
