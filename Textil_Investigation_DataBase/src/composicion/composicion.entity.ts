import { TelaEntity } from 'src/tela/tela.entity';
<<<<<<< HEAD
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
=======
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
>>>>>>> main

@Entity()
export class ComposicionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToMany(() => TelaEntity, (tela) => tela.composiciones)
<<<<<<< HEAD
=======
  @JoinTable()
>>>>>>> main
  telas: TelaEntity[];
}
