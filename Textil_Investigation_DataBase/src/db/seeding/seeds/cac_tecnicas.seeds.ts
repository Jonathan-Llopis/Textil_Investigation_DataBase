import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Cac_TecnicasEntity } from 'src/cac_tecnicas/cac_tecnicas.entity';
import cacTecnicasData from '../../../data/cac_tecnicas';

export class CacTecnicasSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const cacTecnicasRepository = dataSource.getRepository(Cac_TecnicasEntity);

    await cacTecnicasRepository.save(cacTecnicasData);

    console.log('Datos de Características Técnicas insertados');
  }
}
