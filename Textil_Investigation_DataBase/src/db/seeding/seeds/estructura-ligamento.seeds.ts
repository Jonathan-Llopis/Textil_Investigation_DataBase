import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import estructuraLigamentoData from '../../../data/estructura-ligamento';
import { EstructuraLigamentosEntity } from '../../../estructura-ligamento/estructura-ligamento.entity';

export class EstructuraLigamentoSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const estructuraLigamentoRepository = dataSource.getRepository(
      EstructuraLigamentosEntity,
    );

    await estructuraLigamentoRepository.save(estructuraLigamentoData);

    console.log('Datos de Estructura ligamentos insertados');
  }
}
