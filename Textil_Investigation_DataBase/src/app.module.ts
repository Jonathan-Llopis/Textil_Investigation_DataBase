import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './users/users.entity';
import { AuthorizationMiddleware } from './authorization.middleware';
import { AuthService } from './Autentication/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './files/files.module';
import { TelaModule } from './tela/tela.module';
import { TelaEntity } from './tela/tela.entity';
import { ComposicionEntity } from './composicion/composicion.entity';
import { TipoEstructuralEntity } from './tipo_estructural/tipo_estructural.entity';
import { Cac_TecnicasEntity } from './cac_tecnicas/cac_tecnicas.entity';
import { ConservacionEntity } from './conservacion/conservacion.entity';
import { EstructuraLigamentosEntity } from './estructura-ligamento/estructura-ligamento.entity';
import { ComposicionModule } from './composicion/composicion.module';
import { TipoEstructuralModule } from './tipo_estructural/tipo_estructural.module';
import { CacTecnicasModule } from './cac_tecnicas/cac_tecnicas.module';
import { ConservacionModule } from './conservacion/conservacion.module';
import { AplicacionesEntity } from './aplicaciones/aplicaciones.enttity';
import { AplicacionesModule } from './aplicaciones/aplicaciones.module';
import { CacVisualEntity } from './cac_visuales/cac_visuales.entity';
import { CacVisualesModule } from './cac_visuales/cac_visuales.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    UtilsModule,
    TelaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'database',
        port: +configService.get('MYSQL_PORT') || 3306,
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [
          UserEntity,
          TelaEntity,
          ComposicionEntity,
          TipoEstructuralEntity,
          Cac_TecnicasEntity,
          ConservacionEntity,
          EstructuraLigamentosEntity,
          AplicacionesEntity,
          CacVisualEntity
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      TelaEntity,
      ComposicionEntity,
      TipoEstructuralEntity,
      ConservacionEntity,
      EstructuraLigamentosEntity,
      AplicacionesEntity
    ]),
    FilesModule,
    ComposicionModule,
    TipoEstructuralModule,
    CacTecnicasModule,
    ConservacionModule,
    EstructuraLigamentosEntity,
    AplicacionesModule,
    CacVisualesModule
  ],
  controllers: [],
  providers: [AuthorizationMiddleware, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
