import { IsEnum, IsOptional } from 'class-validator';
import { MainRole } from 'src/entities/users/types/entity.types';
import { BaseUserDto } from 'src/modules/types/BaseUser.dto';

export class CreateMentorDto extends BaseUserDto {
  @IsEnum(MainRole)
  // @Transform(({ value }: TransformFnParams) => value || MainRole.MENTOR)
  @IsOptional()
  role: MainRole;

  interests?: string;
}
