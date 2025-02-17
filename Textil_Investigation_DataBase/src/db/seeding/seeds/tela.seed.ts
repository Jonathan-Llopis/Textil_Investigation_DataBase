import { DataSource, In } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import telaData from '../../../data/tela';
import { TelaEntity } from '../../../tela/tela.entity';
import { AplicacionesEntity } from '../../../aplicaciones/aplicaciones.entity';
import { Cac_TecnicasEntity } from '../../../cac_tecnicas/cac_tecnicas.entity';
import { Cac_VisualEntity } from '../../../cac_visuales/cac_visuales.entity';
import { ComposicionEntity } from '../../../composicion/composicion.entity';
import { ConservacionEntity } from '../../../conservacion/conservacion.entity';
import { EstructuraLigamentosEntity } from '../../../estructura-ligamento/estructura-ligamento.entity';
import { TipoEstructuralEntity } from '../../../tipo_estructural/tipo_estructural.entity';

export class TelaSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const telaRepository = dataSource.getRepository(TelaEntity);
    const aplicacionesRepository = dataSource.getRepository(AplicacionesEntity);
    const composicionRepository = dataSource.getRepository(ComposicionEntity);
    const tipoEstructuralRepository = dataSource.getRepository(
      TipoEstructuralEntity,
    );
    const estructuraLigamentosRepository = dataSource.getRepository(
      EstructuraLigamentosEntity,
    );
    const cacTecnicasRepository = dataSource.getRepository(Cac_TecnicasEntity);
    const cacVisualRepository = dataSource.getRepository(Cac_VisualEntity);
    const conservacionRepository = dataSource.getRepository(ConservacionEntity);

    for (const tela of telaData) {
      const aplicaciones = await aplicacionesRepository.findBy({
        id_aplicaciones: In(tela.aplicaciones),
      });
      const composiciones = await composicionRepository.findBy({
        id: In(tela.composicion),
      });
      const tipoEstructurales = await tipoEstructuralRepository.findBy({
        id_tipo_estructural: In(tela.tipo_estructural),
      });
      const estructuraLigamentos = await estructuraLigamentosRepository.findBy({
        id: In(tela.estructura_ligamento),
      });
      const cacTecnicas = await cacTecnicasRepository.findBy({
        id: tela.cac_tecnica,
      });
      const cacVisuales = await cacVisualRepository.findBy({
        id_cac_visual: tela.cac_visual,
      });
      const conservaciones = await conservacionRepository.findBy({
        id: In(tela.conservacion),
      });

      await telaRepository.save({
        denominacion: tela.denominacion,
        aplicaciones_tela: aplicaciones,
        composiciones: composiciones,
        tipo_estructurales: tipoEstructurales,
        estructura_ligamentos: estructuraLigamentos,
        caracteristicas_tecnicas: cacTecnicas,
        caracteristicas_visuales: cacVisuales,
        conservaciones: conservaciones,
      });
    }

    console.log('Datos de tela insertados con relaciones');
  }
}
