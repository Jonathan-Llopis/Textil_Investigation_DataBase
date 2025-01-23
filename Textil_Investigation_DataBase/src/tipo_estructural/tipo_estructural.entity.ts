import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { TelaEntity } from '../tela/tela.entity';

@Entity()
export class TipoEstructuralEntity {
  @PrimaryGeneratedColumn()
  id_tipo_estructural: number;

  @Column()
  tipo: string;

  @ManyToMany(() => TelaEntity, (tela) => tela.tipo_estructurales)
  telas: TelaEntity[];
}
