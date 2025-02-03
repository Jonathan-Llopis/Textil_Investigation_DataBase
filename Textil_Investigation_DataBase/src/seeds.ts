import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { config } from 'dotenv';
import { TelaEntity } from './tela/tela.entity';
import { ConservacionEntity } from './conservacion/conservacion.entity';
import { ConservacionSeeder } from './db/seeding/seeds/conservacion.seeds';
import { ComposicionEntity } from './composicion/composicion.entity';
import { TipoEstructuralEntity } from './tipo_estructural/tipo_estructural.entity';
import { EstructuraLigamentosEntity } from './estructura-ligamento/estructura-ligamento.entity';
import { AplicacionesEntity } from './aplicaciones/aplicaciones.entity';
import { Cac_TecnicasEntity } from './cac_tecnicas/cac_tecnicas.entity';
import { Cac_VisualEntity } from './cac_visuales/cac_visuales.entity';
import { UserEntity } from './users/users.entity';
import { AplicacionesSeeder } from './db/seeding/seeds/aplicaciones.seeds';
import { ComposicionSeeder } from './db/seeding/seeds/composicion.seeds';
import { TipoEstructuralSeeder } from './db/seeding/seeds/tipo_estructural.seeds';
import { EstructuraLigamentoSeeder } from './db/seeding/seeds/estructura-ligamento.seeds';
import { CacVisualesSeeder } from './db/seeding/seeds/cac_visuales.seeds';
import { CacTecnicasSeeder } from './db/seeding/seeds/cac_tecnicas.seeds';
import { TelaSeeder } from './db/seeding/seeds/tela.seed';

config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mariadb',
  host: 'database',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,

  entities: [
    AplicacionesEntity,
    Cac_TecnicasEntity,
    Cac_VisualEntity,
    ComposicionEntity,
    ConservacionEntity,
    EstructuraLigamentosEntity,
    TelaEntity,
    TipoEstructuralEntity,
    UserEntity,
  ],
  seeds: [
    AplicacionesSeeder,
    ComposicionSeeder,
    ConservacionSeeder,
    EstructuraLigamentoSeeder,
    TipoEstructuralSeeder,
    CacTecnicasSeeder,
    CacVisualesSeeder,
    TelaSeeder,
  ],
};

const dataSource = new DataSource(options);

dataSource
  .initialize()
  .then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
  })
  .catch((error) => console.log('Error initializing data source', error));
