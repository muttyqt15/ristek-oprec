import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaketSponsor } from 'src/entities/users/external/Sponsor';
import { MainRole } from 'src/entities/users/types/entity.types';

export class CreateSponsorDto {
  @IsNotEmpty()
  brand_name: string;

  @IsNotEmpty()
  @IsEnum(PaketSponsor)
  paket_sponsor: PaketSponsor;

  @IsNotEmpty()
  brand_code: string;

  role?: MainRole.SPONSOR;
}
