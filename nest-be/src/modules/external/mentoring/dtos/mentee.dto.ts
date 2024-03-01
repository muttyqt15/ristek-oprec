import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseUserDto } from 'src/modules/types/BaseUser.dto';
import { MainRole } from 'src/entities/users/types/entity.types';

export class CreateMenteeDto extends BaseUserDto {
  @IsEnum(MainRole)
  @IsOptional()
  role: MainRole;

  @IsNotEmpty()
  jalur_masuk: string;
}
