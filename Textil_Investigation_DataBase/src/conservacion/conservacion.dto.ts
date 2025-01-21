import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateConservacionDto {
  @IsString()
  description: string;

  @IsInt()
  @IsNotEmpty()
  id_tela: number;
}

export class UpdateConservacionDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  id_tela?: number;
}
