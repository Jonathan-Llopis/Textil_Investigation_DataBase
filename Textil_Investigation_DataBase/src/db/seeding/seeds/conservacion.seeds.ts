import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import conversacionData from '../../../data/conservacion';
import { ConservacionEntity } from '../../../conservacion/conservacion.entity';

export class ConservacionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const coservacionRepository = dataSource.getRepository(ConservacionEntity);

    await coservacionRepository.save(conversacionData);

    console.log('Datos de conservacion insertados');
  }
}
