import { TelaEntity } from 'src/tela/tela.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Composicion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToMany(() => TelaEntity, (tela) => tela.composiciones)
  telas: TelaEntity[];
}
