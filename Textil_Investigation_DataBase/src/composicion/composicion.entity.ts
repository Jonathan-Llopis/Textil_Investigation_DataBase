import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Composicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToMany(() => Tela, (tela) => tela.composiciones)
  telas: Tela[];
}
