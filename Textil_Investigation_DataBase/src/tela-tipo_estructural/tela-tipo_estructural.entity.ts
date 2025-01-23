import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TelaEntity } from '../tela/tela.entity';
import { TipoEstructuralEntity } from 'src/tipo_estructural/tipo_estructural.entity';

@Entity('tela_tipo_estructural')
export class TelaTipoEstructuralEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TelaEntity, (tela) => tela.tipo_estructurales)
  @JoinColumn({ name: 'id_tela' })
  tela: TelaEntity;

  @ManyToOne(
    () => TipoEstructuralEntity,
    (tipoEstructural) => tipoEstructural.telas,
  )
  @JoinColumn({ name: 'id_tipo_estructural' })
  tipo_estructural: TipoEstructuralEntity;
}
