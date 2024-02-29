import { IsNumber, IsNotEmpty } from 'class-validator';

export class GroupOKKDto {
  @IsNotEmpty()
  group_name: string;

  @IsNotEmpty()
  @IsNumber()
  mentorId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  menteeIds: number[];
}
