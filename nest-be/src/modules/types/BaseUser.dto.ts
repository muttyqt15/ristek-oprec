import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  // Validate,
} from 'class-validator';
import { MainRole } from 'src/entities/users/types/entity.types';
// import IsUnique from 'src/utils/isUniqueValidator';

export class BaseUserDto {
  @ApiProperty({
    description: 'Name of user',
    example: 'qinnnyy boy',
  })
  @IsNotEmpty()
  @IsString()
  // @Validate(IsUnique)
  name: string;

  @ApiProperty({
    description: 'User batch (angkatan)',
    example: 2023,
  })
  @IsNotEmpty()
  @IsNumber()
  batch: number;

  @ApiProperty({
    description: 'Password of user',
    example: 'superSecret PASSWORD 123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty({
    description:
      'Role of user - IMPORTANT! SESUAIIN SAMA ROLE YANG ANDA BIKIN! PI jadi role ini PI, BPH, jadi BPH etc',
    example: MainRole.BPH,
  })
  @IsEnum(MainRole)
  role: MainRole;

  @ApiProperty({
    description: 'Refresh token for auth, nullable',
    nullable: true,
    example: 'likeAReallyHashedToken!',
  })
  refreshToken?: string;
}
