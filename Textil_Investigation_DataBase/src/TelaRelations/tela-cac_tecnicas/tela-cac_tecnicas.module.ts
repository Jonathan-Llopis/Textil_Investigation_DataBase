import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TelaEntity } from '../../tela/tela.entity';
import { TelaCacTecnicasController } from './tela-cac_tecnicas.controller';
import { TelaCacTecnicasService } from './tela-cac_tecnicas.service';
import { Cac_TecnicasEntity } from '../../cac_tecnicas/cac_tecnicas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TelaEntity, Cac_TecnicasEntity])],
  controllers: [TelaCacTecnicasController],
  providers: [TelaCacTecnicasService],
})
export class TelaCacTecnicasModule {}
