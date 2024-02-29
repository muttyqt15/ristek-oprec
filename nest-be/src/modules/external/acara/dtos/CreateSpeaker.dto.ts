import { IsNotEmpty } from 'class-validator';
import { MainRole } from 'src/entities/users/types/entity.types';

export class CreateSpeakerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  expert_field: string;

  @IsNotEmpty()
  speaker_code: string;

  role?: MainRole.SPONSOR;
}
