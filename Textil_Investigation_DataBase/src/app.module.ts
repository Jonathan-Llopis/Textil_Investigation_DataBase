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
import { AplicacionesEntity } from './aplicaciones/aplicaciones.entity';
import { AplicacionesModule } from './aplicaciones/aplicaciones.module';
import { Cac_VisualEntity } from './cac_visuales/cac_visuales.entity';
import { CacVisualesModule } from './cac_visuales/cac_visuales.module';
import { EstructuraLigamentosModule } from './estructura-ligamento/estructura-ligamento.module';
import { TelaAplicacionesModule } from './TelaRelations/tela-aplicaciones/tela-aplicaciones.module';
import { TelaCacTecnicasModule } from './TelaRelations/tela-cac_tecnicas/tela-cac_tecnicas.module';
import { TelaTipoCac_VisualesModule } from './TelaRelations/tela-cac_Visuales/tela-cac_Visuales.module';
import { TelaComposicionModule } from './TelaRelations/tela-composicion/tela-composicion.module';
import { TelaConservacionModule } from './TelaRelations/tela-conservacion/tela-conservacion.module';
import { TelaEstructuraLigamentoModule } from './TelaRelations/tela-estructura_ligamento/tela-estructura_ligamento.module';
import { TelaTipoEstructuralModule } from './TelaRelations/tela-tipo_estructural/tela-tipo_estructural.module';
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
    AplicacionesModule,
    CacTecnicasModule,
    CacVisualesModule,
    ComposicionModule,
    ConservacionModule,
    TelaModule,
    TipoEstructuralModule,
    UsersModule,
    UtilsModule,
    FilesModule,
    TelaAplicacionesModule,
    TelaCacTecnicasModule,
    TelaTipoCac_VisualesModule,
    TelaComposicionModule,
    TelaConservacionModule,
    TelaEstructuraLigamentoModule,
    TelaTipoEstructuralModule,
    EstructuraLigamentosModule,
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
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      AplicacionesEntity,
      Cac_TecnicasEntity,
      Cac_VisualEntity,
      ComposicionEntity,
      ConservacionEntity,
      EstructuraLigamentosEntity,
      TelaEntity,
      TipoEstructuralEntity,
      UserEntity,
    ]),
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
