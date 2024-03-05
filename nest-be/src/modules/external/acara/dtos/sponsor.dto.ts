import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaketSponsor } from 'src/entities/users/external/Sponsor';

export class CreateSponsorDto {
  @IsNotEmpty()
  brand_name: string;

  @IsNotEmpty()
  @IsEnum(PaketSponsor)
  paket_sponsor: PaketSponsor;

  @IsNotEmpty()
  brand_code: string;

  @IsNotEmpty()
  acaraIds: number[];
}

export class UpdateSponsorDto extends PartialType(CreateSponsorDto) {}
