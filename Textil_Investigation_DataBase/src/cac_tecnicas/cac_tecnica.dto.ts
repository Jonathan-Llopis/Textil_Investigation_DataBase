import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCacTecnicaDto {
  @IsString()
  description: string;

  @IsInt()
  @IsNotEmpty()
  id_tela: number;
}

export class UpdateCacTecnicaDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  id_tela?: number;
}
