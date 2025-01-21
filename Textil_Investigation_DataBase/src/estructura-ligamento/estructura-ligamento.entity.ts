import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estructura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  detalle: string;
}
