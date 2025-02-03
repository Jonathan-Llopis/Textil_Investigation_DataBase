import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Cac_VisualEntity } from '../../../cac_visuales/cac_visuales.entity';
import cacVisualesData from '../../../data/cac_visuales';

export class CacVisualesSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const cacVisualesRepository = dataSource.getRepository(Cac_VisualEntity);

    await cacVisualesRepository.save(cacVisualesData);

    console.log('Datos de Características Visuales insertados');
  }
}
