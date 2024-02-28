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
  @IsNotEmpty()
  @IsString()
  // @Validate(IsUnique)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  batch: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(MainRole)
  role: MainRole;

  refreshToken?: string;
}
