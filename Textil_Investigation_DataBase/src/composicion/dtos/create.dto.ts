import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CreateComposicionDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;
}
