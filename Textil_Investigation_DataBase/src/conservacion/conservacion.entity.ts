import { TelaEntity } from '../tela/tela.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class ConservacionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToMany(() => TelaEntity, (telas) => telas.conservaciones)
  @JoinTable()
  telas: TelaEntity[];
}
