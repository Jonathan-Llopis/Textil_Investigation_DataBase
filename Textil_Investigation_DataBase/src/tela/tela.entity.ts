import { AplicacionesEntity } from '../aplicaciones/aplicaciones.entity';
import { Cac_TecnicasEntity } from '../cac_tecnicas/cac_tecnicas.entity';
import { Cac_VisualEntity } from '../cac_visuales/cac_visuales.entity';
import { ComposicionEntity } from '../composicion/composicion.entity';
import { ConservacionEntity } from '../conservacion/conservacion.entity';
import { EstructuraLigamentosEntity } from '../estructura-ligamento/estructura-ligamento.entity';
import { TipoEstructuralEntity } from '../tipo_estructural/tipo_estructural.entity';
import { UserEntity } from '../users/users.entity';
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

  @Column({ nullable: true })
  id_img: string;

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
  aplicaciones_tela: AplicacionesEntity[];

  // Relación Many-to-Many con Características Técnicas
  @ManyToMany(
    () => Cac_TecnicasEntity,
    (caracteristicaTecnica) => caracteristicaTecnica.telas,
  )
  @JoinTable()
  caracteristicas_tecnicas: Cac_TecnicasEntity[];

  // // Relación Many-to-Many con Características Visuales
  @ManyToMany(
    () => Cac_VisualEntity,
    (caracteristicas_visuales) => caracteristicas_visuales.telas,
  )
  @JoinTable()
  caracteristicas_visuales: Cac_VisualEntity[];

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
