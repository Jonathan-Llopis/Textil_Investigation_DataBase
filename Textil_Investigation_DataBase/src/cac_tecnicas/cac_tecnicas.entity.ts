import { TelaEntity } from 'src/tela/tela.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Cac_TecnicasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resistencia: number;

  @Column()
  absorcion: number;

  @Column()
  elasticidad: number;

  //Relación Many-to-Many con Características Técnicas
  @ManyToMany(() => TelaEntity, (telas) => telas.caracteristicas_tecnicas)
  @JoinTable()
  telas: TelaEntity[];
}
