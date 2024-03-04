import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { DivisiBPH } from 'src/entities/users/types/bph.types';
import { AnggotaBPH } from 'src/entities/users/panitia/AnggotaBPH';

export class CreateRapatDto {
  @ApiProperty({
    description: 'The name of the meeting',
    example: 'Monthly Team Meeting',
  })
  @IsNotEmpty()
  rapat_name: string;

  @ApiProperty({
    description: 'The division responsible for the meeting',
    enum: DivisiBPH,
    example: DivisiBPH.IT_DAN_BROADCAST,
  })
  @IsNotEmpty()
  @IsEnum(DivisiBPH)
  divisi: DivisiBPH;

  @ApiProperty({
    description: 'The time of the meeting in "HH:mm" format',
    example: '17:00',
  })
  @IsNotEmpty()
  waktu: string;

  @ApiProperty({
    description: 'The location of the meeting',
    example: 'Conference Room A',
  })
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'The agenda of the meeting',
    example: 'Discuss project updates and future plans',
  })
  agenda?: string;

  @ApiProperty({
    description: 'Array of IDs representing attendees of the meeting',
    example: [1, 2, 3],
  })
  @IsNotEmpty()
  list_hadir_ids: number[];
}

export class UpdateRapatDto extends PartialType(CreateRapatDto) {
  @IsOptional()
  list_hadir?: AnggotaBPH[];
}
