import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { TelaEntity } from '../tela/tela.entity';

@Entity()
export class AplicacionesEntity {
  @PrimaryGeneratedColumn()
  id_aplicaciones: number;

  @Column()
  tipo_aplicacion: string;

  @ManyToMany(() => TelaEntity, (tela) => tela.aplicaciones)
  telas: TelaEntity[];
}
