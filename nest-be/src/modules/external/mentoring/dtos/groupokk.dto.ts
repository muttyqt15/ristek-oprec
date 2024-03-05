import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateGroupOKKDto {
  @ApiProperty({
    description: 'Name of OKK Group',
    example: 'Coolest OKK GROUP!',
  })
  @IsNotEmpty()
  group_name: string;

  @ApiProperty({
    description: 'Mentor ID responsible for overseeing this particular group',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  mentorId: number;

  @ApiProperty({
    description:
      'List of OKK Group mentee Ids - make sure to actually create the mentees first and put in the correct ids',
    example: [1, 2, 3],
  })
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  menteeIds: number[];
}
