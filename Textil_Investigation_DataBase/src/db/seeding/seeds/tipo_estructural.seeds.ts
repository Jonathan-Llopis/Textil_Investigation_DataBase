import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import tipoEstructuralData from '../../../data/tipo_estructural';
import { TipoEstructuralEntity } from 'src/tipo_estructural/tipo_estructural.entity';

export class TipoEstructuralSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const tipoEstructuralRepository = dataSource.getRepository(
      TipoEstructuralEntity,
    );

    await tipoEstructuralRepository.save(tipoEstructuralData);

    console.log('Datos de Tipos Estructurales insertados');
  }
}
