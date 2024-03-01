import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AcaraImportance } from 'src/entities/other/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAcaraDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Cool Club Hangout',
    description: 'The name of the event',
  })
  nama_acara: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Gedung C Psiko 207',
    description: 'The location of the event',
  })
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The duration of the event in hours',
  })
  duration: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Indicates whether the event is currently in progress',
  })
  in_progress: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Sponsor brand',
    description: 'The sponsor of the event',
  })
  sponsor?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Speaker Name',
    description: 'The speaker of the event',
  })
  speaker?: string;

  @ApiProperty({
    example: 'MAX',
    description: 'The importance level of the event',
  })
  importance?: AcaraImportance;
}

export class UpdateAcaraDto {
  @ApiProperty({
    example: 'Cool Club Hangout',
    description: 'The name of the event',
  })
  nama_acara?: string;

  @ApiProperty({
    example: 'Gedung C Psiko 207',
    description: 'The location of the event',
  })
  location?: string;

  @ApiProperty({
    example: 1,
    description: 'The duration of the event in hours',
  })
  duration?: number;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the event is currently in progress',
  })
  in_progress?: boolean;

  @ApiProperty({
    example: 'Sponsor Name',
    description: 'The sponsor of the event',
  })
  sponsor?: string;

  @ApiProperty({
    example: 'max',
    description:
      "The importance level of the event, the available values are 'max', 'mid', 'low'.",
  })
  importance?: AcaraImportance;
}
