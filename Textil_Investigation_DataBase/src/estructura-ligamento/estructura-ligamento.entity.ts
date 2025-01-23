import { TelaEntity } from 'src/tela/tela.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class EstructuraLigamentosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  detalle: string;

  @ManyToMany(() => TelaEntity, (tela) => tela.tipo_estructurales)
  telas: TelaEntity[];
}
