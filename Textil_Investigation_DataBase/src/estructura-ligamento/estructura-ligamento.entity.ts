import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Estructura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  detalle: string;

  @ManyToMany(() => Tela, (tela) => tela.estructuras)
  telas: Tela[];
}
