import { TelaEntity } from 'src/tela/tela.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class CacVisualEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToMany(() => TelaEntity, (tela) => tela.caracteristicas_visuales)
  telas: TelaEntity[];
}
