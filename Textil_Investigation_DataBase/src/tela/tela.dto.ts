import { IsArray, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { ArrayMaxSize } from 'class-validator';

export class CreateTelaDto {
  @IsString()
  @Length(1, 500)
  denominacion: string;

  @IsString()
  id_img: string;

  @IsArray()
  @IsInt()
  ids_aplicaciones?: number[];

  @IsArray()
  @IsInt()
  ids_tipo_estructural?: number[];

  @IsArray()
  @IsInt()
  ids_composicion?: number[];

  @IsArray()
  @IsInt()
  ids_conservacion?: number[];

  @IsArray()
  @IsInt()
  ids_estructura_ligamento?: number[];

  @IsArray()
  @IsInt()
  @ArrayMaxSize(3, {
    message: 'El campo ids_cac_tecnica debe tener un máximo de 3 elementos.',
  })
  ids_cac_tecnica?: number[];

  @IsArray()
  @IsInt()
  @ArrayMaxSize(3, {
    message: 'El campo ids_cac_visuales debe tener un máximo de 3 elementos.',
  })
  ids_cac_visuales?: number[];
}

export class UpdateTelaDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  denominacion?: string; // La denominación es opcional en la actualización

  @IsString()
  id_img: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @ArrayMaxSize(3, {
    message: 'El campo ids_cac_tecnica debe tener un máximo de 3 elementos.',
  })
  ids_cac_tecnica?: number[]; // Los arrays son opcionales y pueden tener hasta 3 elementos

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @ArrayMaxSize(3, {
    message: 'El campo ids_cac_visuales debe tener un máximo de 3 elementos.',
  })
  ids_cac_visuales?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_aplicaciones?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_tipo_estructural?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_composicion?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_conservacion?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_estructura_ligamento?: number[];
}

export class FilterTelaDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  denominacion?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_aplicaciones?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_tipo_estructural?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_composicion?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_conservacion?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_estructura_ligamento?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_cac_tecnica?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  ids_cac_visuales?: number[];
}
