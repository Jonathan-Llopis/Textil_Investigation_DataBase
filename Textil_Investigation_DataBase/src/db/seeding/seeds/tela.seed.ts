import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import telaData from '../../../data/tela';
import { TelaEntity } from '../../../tela/tela.entity';

export class TelaSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const telaRepository = dataSource.getRepository(TelaEntity);

    await telaRepository.save(telaData);

    console.log('Datos de tela insertados');
  }
}
