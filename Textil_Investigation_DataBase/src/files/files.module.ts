import { forwardRef, Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';
import { FilesService } from '././files.service';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';
import { TelaModule } from 'src/tela/tela.module';
import { ComposicionModule } from 'src/composicion/composicion.module';
import { AplicacionesModule } from 'src/aplicaciones/aplicaciones.module';
import { ConservacionModule } from 'src/conservacion/conservacion.module';
import { TipoEstructuralModule } from 'src/tipo_estructural/tipo_estructural.module';
import { EstructuraLigamentosModule } from 'src/estructura-ligamento/estructura-ligamento.module';
import * as multer from 'multer';
import { CacVisualesModule } from 'src/cac_visuales/cac_visuales.module';
import { CacTecnicasModule } from 'src/cac_tecnicas/cac_tecnicas.module';


@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: multer.memoryStorage(),
      }),
      useClass: GridFsMulterConfigService,
    }),
    forwardRef(() => TelaModule),
    UtilsModule,
    TypeOrmModule.forFeature([UserEntity]),
    ComposicionModule,
    AplicacionesModule,
    ConservacionModule,
    TipoEstructuralModule,
    EstructuraLigamentosModule,
    CacVisualesModule,
    CacTecnicasModule
  ],
  controllers: [FilesController],
  providers: [GridFsMulterConfigService, FilesService],
  exports: [FilesService],
})
export class FilesModule {}
