import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conservacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  //   @ManyToMany(() => TelaEntity, (telas) => telas.conservacion)
  //   @JoinTable()
  //   telas: TelaEntity[];
}
