// user.dto.ts
import { IsEmail, IsString, IsOptional, Length } from 'class-validator';
export class CreateUserDto {
  @IsOptional()
  @IsString()
  id_user?: number;

  @IsString()
  @Length(1, 500)
  username: string;

  @IsString()
  @Length(1, 500)
  password: string;

  @IsEmail()
  email: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  id_user?: number;

  @IsString()
  @IsOptional()
  @Length(1, 500)
  username: string;

  @IsString()
  @IsString()
  @Length(1, 500)
  password: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
