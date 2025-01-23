import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cac_Tecnicas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

//  //Relación Many-to-Many con Características Técnicas
//   @ManyToMany(() => TelaEntity , (telas) => telas.caracteristicaTecnica)
//   @JoinTable()
//   telas: TelaEntity [];
}
