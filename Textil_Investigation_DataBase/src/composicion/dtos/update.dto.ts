import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UpdateComposicionDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;
}
