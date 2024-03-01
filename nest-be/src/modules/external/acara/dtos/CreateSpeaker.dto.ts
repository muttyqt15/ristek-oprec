import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MainRole } from 'src/entities/users/types/entity.types';

export class CreateSpeakerDto {
  @ApiProperty({
    description: 'The name of the speaker',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The expert field of the speaker',
    example: 'Software Engineering',
  })
  @IsNotEmpty()
  expert_field: string;

  @ApiProperty({
    description: 'The code of the speaker',
    example: 'SPK001',
  })
  @IsNotEmpty()
  speaker_code: string;

  @ApiProperty({
    description: 'The role of the speaker',
    enum: MainRole,
    default: MainRole.SPEAKER,
    example: MainRole.SPEAKER,
  })
  role?: MainRole.SPEAKER;
}
