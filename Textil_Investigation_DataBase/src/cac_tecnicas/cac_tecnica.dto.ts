import {IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCacTecnicaDto {
  @IsInt()
  resistencia: number;

  @IsInt()
  absorcion: number;

  @IsInt()
  elasticidad: number;

  @IsInt()
  @IsNotEmpty()
  id_tela: number;
}

export class UpdateCacTecnicaDto {
  @IsOptional()
  @IsInt()
  resistencia?: number;

  @IsOptional()
  @IsInt()
  absorcion?: number;

  @IsOptional()
  @IsInt()
  elasticidad?: number;

  @IsOptional()
  @IsInt()
  id_tela?: number;
}
