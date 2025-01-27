import { TelaEntity } from 'src/tela/tela.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Cac_VisualesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToMany(() => TelaEntity, (tela) => tela.cac_visuales)
  telas: TelaEntity[];
}
