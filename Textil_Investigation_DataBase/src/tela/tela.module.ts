import { forwardRef, Module } from '@nestjs/common';
import { TelaController } from './tela.controller';
import { TelaService } from './tela.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelaEntity } from './tela.entity';
import { FilesModule } from 'src/files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AplicacionesModule } from 'src/aplicaciones/aplicaciones.module';
import { CacTecnicasModule } from 'src/cac_tecnicas/cac_tecnicas.module';
import { CacVisualesModule } from 'src/cac_visuales/cac_visuales.module';
import { ComposicionModule } from 'src/composicion/composicion.module';
import { ConservacionModule } from 'src/conservacion/conservacion.module';
import { EstructuraLigamentosModule } from 'src/estructura-ligamento/estructura-ligamento.module';
import { TipoEstructuralModule } from 'src/tipo_estructural/tipo_estructural.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: memoryStorage(),
      }),
    }),
    TypeOrmModule.forFeature([TelaEntity]),
    forwardRef(() => FilesModule),
    ComposicionModule,
    AplicacionesModule,
    ConservacionModule,
    TipoEstructuralModule,
    EstructuraLigamentosModule,
    CacVisualesModule,
    CacTecnicasModule
  ],
  controllers: [TelaController],
  providers: [TelaService],
  exports: [TelaService],
})
export class TelaModule { }
