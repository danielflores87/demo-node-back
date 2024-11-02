import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsInt,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  numberDocument: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  email: string;
}

export class UserLoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class UserFilterDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;
  
  @IsInt()
  page: number;

  @IsInt()
  perPage: number;
}
