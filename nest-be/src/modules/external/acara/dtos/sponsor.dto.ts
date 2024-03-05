import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaketSponsor } from 'src/entities/users/external/Sponsor';

export class CreateSponsorDto {
  @ApiProperty({
    description: 'Name of sponsor',
    example: 'Cool Sponsor',
  })
  @IsNotEmpty()
  brand_name: string;

  @ApiProperty({
    description: 'Paket of sponsor for the chosen events',
    example: PaketSponsor.PLATINUM,
  })
  @IsNotEmpty()
  @IsEnum(PaketSponsor)
  paket_sponsor: PaketSponsor;

  @ApiProperty({
    description: 'Sponsor code, kind of like a password',
    example: 'H17131',
  })
  @IsNotEmpty()
  brand_code: string;

  @ApiProperty({
    description: 'The ID of current events the sponsor is sponsoring',
    example: [1, 2],
  })
  @IsNotEmpty()
  acaraIds: number[];
}

export class UpdateSponsorDto extends PartialType(CreateSponsorDto) {}
