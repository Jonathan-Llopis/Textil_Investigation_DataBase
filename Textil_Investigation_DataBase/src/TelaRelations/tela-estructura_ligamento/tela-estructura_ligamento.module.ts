import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelaEntity } from '../../tela/tela.entity';
import { EstructuraLigamentosEntity } from '../../estructura-ligamento/estructura-ligamento.entity';
import { TelaEstructuraLigamentoController } from './tela-estructura_ligamento.controller';
import { TelaEstructuraLigamentoService } from './tela-estructura_ligamento.service';

@Module({
  imports: [TypeOrmModule.forFeature([TelaEntity, EstructuraLigamentosEntity])],
  controllers: [TelaEstructuraLigamentoController],
  providers: [TelaEstructuraLigamentoService],
  exports: [TelaEstructuraLigamentoService],
})
export class TelaEstructuraLigamentoModule {}
