import { TelaEntity } from '../tela/tela.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Cac_VisualEntity {
  @PrimaryGeneratedColumn()
  id_cac_visual: number;

  @Column()
  transparencia: number;

  @Column()
  brillo: number;

  @Column()
  tacto: number;

  @ManyToMany(() => TelaEntity, (tela) => tela.caracteristicas_visuales)
  telas: TelaEntity[];
}
