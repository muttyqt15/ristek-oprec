import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseUserDto } from 'src/modules/types/BaseUser.dto';
import { MainRole } from 'src/entities/users/types/entity.types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenteeDto extends BaseUserDto {
  @ApiProperty({
    description: 'Default role for mentee',
    enum: MainRole,
    example: MainRole.NON_STAFF,
  })
  @IsEnum(MainRole)
  @IsOptional()
  role: MainRole;

  @ApiProperty({
    description: 'Jalur masuk UI',
    example: 'SIMAK UI',
  })
  @IsNotEmpty()
  jalur_masuk: string;
}
