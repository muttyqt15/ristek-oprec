import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator'; // Import validators as per your requirements
import { BPH_ROLE, DivisiBPH } from 'src/entities/users/types/bph.types';
import { MainRole } from 'src/entities/users/types/entity.types';
import { BaseUserDto } from 'src/modules/types/BaseUser.dto';

export class CreateBPHDto extends BaseUserDto {
  @ApiProperty({
    description: 'Default role for BPH',
    enum: MainRole,
    example: MainRole.BPH,
  })
  @IsEnum(MainRole)
  role: MainRole;

  @ApiProperty({
    description: 'Divisi of BPH member',
    enum: DivisiBPH,
    example: DivisiBPH.DEKORASI_DAN_WARDROBE,
  })
  @IsNotEmpty()
  @IsEnum(DivisiBPH)
  divisi: DivisiBPH;

  @ApiProperty({
    description: 'Role of BPH member in that division',
    enum: BPH_ROLE,
    example: BPH_ROLE.PJ,
  })
  @IsNotEmpty()
  @IsEnum(BPH_ROLE)
  bph_role: BPH_ROLE;
}

export class UpdateBPHDto extends PartialType(CreateBPHDto) {}
