import { IsOptional, IsString, Length } from 'class-validator';

export class CreateAplicacionDto {
  @IsString()
  @Length(1, 500)
  tipo_aplicacion: string;
}

export class UpdateAplicacionDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  tipo_aplicacion?: string;
}
