import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTelaTipoEstructuralDto {
  @IsInt()
  @IsNotEmpty()
  id_tela: number; // Relacionado con la Tela

  @IsInt()
  @IsNotEmpty()
  id_tipo_estructural: number; // Relacionado con TipoEstructural
}

export class UpdateTelaTipoEstructuralDto {
  @IsOptional()
  @IsInt()
  id_tela?: number; // Relacionado con la Tela

  @IsOptional()
  @IsInt()
  id_tipo_estructural?: number; // Relacionado con TipoEstructural
}
