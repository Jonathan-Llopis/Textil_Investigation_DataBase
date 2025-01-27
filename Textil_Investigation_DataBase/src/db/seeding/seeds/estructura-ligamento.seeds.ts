import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import estructuraLigamentoData from '../../../data/estructura-ligamento';
import { Cac_TecnicasEntity } from '../../../cac_tecnicas/cac_tecnicas.entity';

export class estructuraLigamentoSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const estructuraLigamentoRepository = dataSource.getRepository(Cac_TecnicasEntity);

    await estructuraLigamentoRepository.save(estructuraLigamentoData);

    console.log('Datos de Caracteristicas Técnicas insertados');
  }
}
