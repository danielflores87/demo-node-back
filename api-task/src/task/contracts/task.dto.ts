import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class UserTaskFormDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsDateString()
  @IsNotEmpty()
  dateOfExecution: Date;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UserTaskFilterDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  page: number;

  @IsInt()
  perPage: number;
}
