import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import cacTecnicasData from '../../../data/cacTecnicas';
import { Cac_TecnicasEntity } from '../../../cac_tecnicas/cac_tecnicas.entity';

export class CacTecnicasSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const cacTecnicasRepository = dataSource.getRepository(Cac_TecnicasEntity);

    await cacTecnicasRepository.save(cacTecnicasData);

    console.log('Datos de Caracteristicas Técnicas insertados');
  }
}
