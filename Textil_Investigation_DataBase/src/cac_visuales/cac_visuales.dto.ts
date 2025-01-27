import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCacVisualDto {

  @IsInt()
  transparencia: number;
  
  @IsInt()
  brillo: number;
  
  @IsInt()
  tacto: number;
  
  @IsInt()
  @IsNotEmpty()
  id_tela: number;
  }
  
  export class UpdateCacVisualDto {

    @IsInt()
    @IsOptional()
    transparencia?: number;
    
    @IsInt()
    @IsOptional()
    brillo?: number;
    
    @IsInt()
    @IsOptional()
    tacto?: number;

    @IsInt()
    @IsOptional()
    id_tela?: number;
}
