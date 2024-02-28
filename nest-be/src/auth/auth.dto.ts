import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MainRole } from 'src/entities/users/types/entity.types';

export class AuthDto {
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

  refreshToken?: string;
}
