import { IsOptional, IsString, Length } from 'class-validator';

export class CreateTelaDto {
  @IsString()
  @Length(1, 500)
  denominacion: string;
}

export class UpdateTelaDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  denominacion?: string;
}
