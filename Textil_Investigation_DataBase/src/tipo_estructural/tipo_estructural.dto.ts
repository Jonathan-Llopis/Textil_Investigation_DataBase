import { IsOptional, IsString, Length } from 'class-validator';

export class CreateTipoEstructuralDto {
  @IsString()
  @Length(1, 500)
  tipo: string;
}

export class UpdateTipoEstructuralDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  tipo?: string;
}
