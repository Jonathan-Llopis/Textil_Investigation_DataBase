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
import { AplicacionesEntity } from './aplicaciones/aplicaciones.enttity';

config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mariadb',
  host: 'database',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,

  entities: [
    TelaEntity,
    ComposicionEntity,
    TipoEstructuralEntity,
    ConservacionEntity,
    EstructuraLigamentosEntity,
    AplicacionesEntity,
  ],
  seeds: [ConservacionSeeder],
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
