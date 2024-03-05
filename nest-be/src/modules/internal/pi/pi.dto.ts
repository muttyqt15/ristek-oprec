import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator'; // Import validators as per your requirements
import { MainRole } from 'src/entities/users/types/entity.types';
import { PengurusIntiRole } from 'src/entities/users/types/pi.types';
import { BaseUserDto } from 'src/modules/types/BaseUser.dto';

export class CreatePiDto extends BaseUserDto {
  @ApiProperty({
    description: 'Default role for PI',
    enum: MainRole,
    example: MainRole.PI,
  })
  @IsEnum(MainRole)
  role: MainRole;

  @ApiProperty({
    description: 'Position as PI',
    enum: PengurusIntiRole,
    example: PengurusIntiRole.KOORDINATOR_SARANA_PRASARANA,
  })
  @IsNotEmpty()
  @IsEnum(PengurusIntiRole)
  pi_role: PengurusIntiRole;
}

export class UpdatePIDto extends PartialType(CreatePiDto) {}
