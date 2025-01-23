import { AplicacionesEntity } from 'src/aplicaciones/aplicaciones.enttity';
import { Cac_TecnicasEntity } from 'src/cac_tecnicas/cac_tecnicas.entity';
import { ComposicionEntity } from 'src/composicion/composicion.entity';
import { ConservacionEntity } from 'src/conservacion/conservacion.entity';
import { EstructuraLigamentosEntity } from 'src/estructura-ligamento/estructura-ligamento.entity';
import { TipoEstructuralEntity } from 'src/tipo_estructural/tipo_estructural.entity';
import { UserEntity } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
@Entity()
export class TelaEntity {
  @PrimaryGeneratedColumn()
  id_tela: number;

  @Column()
  denominacion: string;

  @ManyToMany(() => UserEntity, (user) => user.telas_favoritas)
  @JoinTable()
  users: UserEntity[];

  // Relación Many-to-Many con Composición
  @ManyToMany(() => ComposicionEntity, (composicion) => composicion)
  @JoinTable()
  composiciones: ComposicionEntity[];

  //Relación Many-to-Many con Tipo Estructural
  @ManyToMany(
    () => TipoEstructuralEntity,
    (tipoEstructural) => tipoEstructural.telas,
  )
  @JoinTable()
  tipo_estructurales: TipoEstructuralEntity[];

  @ManyToMany(() => AplicacionesEntity, (aplicaciones) => aplicaciones.telas)
  @JoinTable()
  aplicaciones: AplicacionesEntity[];

  // Relación Many-to-Many con Características Técnicas
  @ManyToMany(
    () => Cac_TecnicasEntity,
    (caracteristicaTecnica) => caracteristicaTecnica.telas,
  )
  @JoinTable()
  caracteristicas_tecnicas: Cac_TecnicasEntity[];

  // // Relación Many-to-Many con Características Visuales
  // @ManyToMany(() => CaracteristicaVisual, (caracteristicaVisual) => caracteristicaVisual.telas)
  // @JoinTable()
  // caracteristicas_visuales: CaracteristicaVisual[];

  // // Relación Many-to-Many con Aplicaciones
  // @ManyToMany(() => Aplicacion, (aplicacion) => aplicacion.telas)
  // @JoinTable()
  // aplicaciones: Aplicacion[];

  // Relación Many-to-Many con Conservación
  @ManyToMany(() => ConservacionEntity, (conservacion) => conservacion.telas)
  @JoinTable()
  conservaciones: ConservacionEntity[];

  // Relación Many-to-Many con Estructura y Ligamento
  @ManyToMany(
    () => EstructuraLigamentosEntity,
    (estructuraLigamento) => estructuraLigamento.telas,
  )
  @JoinTable()
  estructura_ligamentos: EstructuraLigamentosEntity[];
}
