import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TelaEntity } from '../../tela/tela.entity';
import { TipoEstructuralEntity } from '../../tipo_estructural/tipo_estructural.entity';
import { TelaCacTecnicasController } from './tela-cac_tecnicas.controller';
import { TelaCacTecnicasService } from './tela-cac_tecnicas.service';

@Module({
  imports: [TypeOrmModule.forFeature([TelaEntity, TipoEstructuralEntity])],
  controllers: [TelaCacTecnicasController],
  providers: [TelaCacTecnicasService],
})
export class TelaCacTecnicasModule {}
