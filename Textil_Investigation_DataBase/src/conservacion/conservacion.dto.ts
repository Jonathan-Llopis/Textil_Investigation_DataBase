import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateConservacionDto {
  @IsString()
  description: string;

}

export class UpdateConservacionDto {
  @IsOptional()
  @IsString()
  description?: string;
}
