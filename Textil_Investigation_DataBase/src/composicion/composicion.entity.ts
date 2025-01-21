import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Composicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;
}
