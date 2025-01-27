import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import cacVisualesData from '../../../data/cacVisuales';
import { Cac_VisualesEntity } from '../../../cac_visuales/cac_visuales.entity';

export class CacVisualesSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const cacVisualesRepository = dataSource.getRepository(Cac_VisualesEntity);

    await cacVisualesRepository.save(cacVisualesData);

    console.log('Datos de Caracteristicas Visuales insertados');
  }
}