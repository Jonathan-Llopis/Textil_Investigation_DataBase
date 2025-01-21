import { TipoEstructuralEntity } from 'src/tipo_estructural/tipo_estructural.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  // ManyToMany,
  // ManyToMany,
} from 'typeorm';
// import { Composicion } from '../composicion/composicion.entity';
// import { CaracteristicaTecnica } from '../caracteristicas-tecnicas/caracteristica-tecnica.entity';
// import { CaracteristicaVisual } from '../caracteristicas-visuales/caracteristica-visual.entity';
// import { Aplicacion } from '../aplicaciones/aplicacion.entity';
// import { Conservacion } from '../conservacion/conservacion.entity';
// import { EstructuraLigamento } from '../estructura-ligamento/estructura-ligamento.entity';
// import { OrigenReciclado } from '../origen-reciclado/origen-reciclado.entity';
// import { Simbolologia } from '../simbolologia/simbolologia.entity';
// import { UserEntity } from '../users/users.entity';
@Entity()
export class TelaEntity {
  @PrimaryGeneratedColumn()
  id_tela: number;

  @Column()
  denominacion: string;

  //   @ManyToMany(() => UserEntity, (user) => user.telas)
  //   @joinTable()
  //   users: UserEntity[];

  //   // Relación Many-to-Many con Composición
  //   @ManyToMany(() => Composicion, (composicion) => composicion.telas)
  //   @JoinTable()
  //   composiciones: Composicion[];

  // Relación Many-to-Many con Tipo Estructural
  @ManyToMany(
    () => TipoEstructuralEntity,
    (tipoEstructural) => tipoEstructural.telas,
  )
  @JoinTable()
  tipo_estructurales: TipoEstructuralEntity[];

  //   // Relación Many-to-Many con Características Técnicas
  //   @ManyToMany(() => CaracteristicaTecnica, (caracteristicaTecnica) => caracteristicaTecnica.telas)
  //   @JoinTable()
  //   caracteristicas_tecnicas: CaracteristicaTecnica[];

  //   // Relación Many-to-Many con Características Visuales
  //   @ManyToMany(() => CaracteristicaVisual, (caracteristicaVisual) => caracteristicaVisual.telas)
  //   @JoinTable()
  //   caracteristicas_visuales: CaracteristicaVisual[];

  //   // Relación Many-to-Many con Aplicaciones
  //   @ManyToMany(() => Aplicacion, (aplicacion) => aplicacion.telas)
  //   @JoinTable()
  //   aplicaciones: Aplicacion[];

  //   // Relación Many-to-Many con Conservación
  //   @ManyToMany(() => Conservacion, (conservacion) => conservacion.telas)
  //   @JoinTable()
  //   conservaciones: Conservacion[];

  //   // Relación Many-to-Many con Estructura y Ligamento
  //   @ManyToMany(() => EstructuraLigamento, (estructuraLigamento) => estructuraLigamento.telas)
  //   @JoinTable()
  //   estructura_ligamentos: EstructuraLigamento[];

  //   // Relación Many-to-Many con Origen y Reciclado
  //   @ManyToMany(() => OrigenReciclado, (origenReciclado) => origenReciclado.telas)
  //   @JoinTable()
  //   origen_reciclados: OrigenReciclado[];

  //   // Relación Many-to-Many con Simbolología
  //   @ManyToMany(() => Simbolologia, (simbolologia) => simbolologia.telas)
  //   @JoinTable()
  //   simbolologias: Simbolologia[];
}
