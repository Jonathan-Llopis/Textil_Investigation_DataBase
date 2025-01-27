import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import estructuraLigamentoData from '../../../data/estructura-ligamento';
import { EstructuraLigamentosEntity } from 'src/estructura-ligamento/estructura-ligamento.entity';

export class estructuraLigamentoSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const estructuraLigamentoRepository = dataSource.getRepository(EstructuraLigamentosEntity);

    await estructuraLigamentoRepository.save(estructuraLigamentoData);

    console.log('Datos de Caracteristicas Técnicas insertados');
  }
}
