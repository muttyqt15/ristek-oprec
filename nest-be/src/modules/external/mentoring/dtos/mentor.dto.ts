import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { MainRole } from 'src/entities/users/types/entity.types';
import { BaseUserDto } from 'src/modules/types/BaseUser.dto';

export class CreateMentorDto extends BaseUserDto {
  @ApiProperty({
    description: 'Default role for mentor',
    enum: MainRole,
    example: MainRole.MENTOR,
  })
  @IsEnum(MainRole)
  @IsOptional()
  role: MainRole;

  @ApiProperty({
    description: 'Mentor interests',
    example: 'Likes cats',
  })
  interests?: string;
}
