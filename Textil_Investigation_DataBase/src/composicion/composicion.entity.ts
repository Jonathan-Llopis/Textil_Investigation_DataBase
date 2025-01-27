import { TelaEntity } from 'src/tela/tela.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class ComposicionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToMany(() => TelaEntity, (tela) => tela.composiciones)
  @JoinTable()
  telas: TelaEntity[];
}
