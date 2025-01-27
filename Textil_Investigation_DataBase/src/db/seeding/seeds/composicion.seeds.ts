import { ComposicionEntity } from '../../../composicion/composicion.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import composicionData from '../../../data/composicion';

export class ComposicionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const composicionRepository = dataSource.getRepository(ComposicionEntity);

    await composicionRepository.insert(composicionData);

    console.log('Datos de Composición insertados');
  }
}
