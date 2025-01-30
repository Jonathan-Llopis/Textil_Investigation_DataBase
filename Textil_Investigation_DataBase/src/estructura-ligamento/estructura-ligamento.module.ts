import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstructuraLigamentosEntity } from './estructura-ligamento.entity';
import { EstructuraLigamentosController } from './estructura-ligamento.controller';
import { EstructuraLigamentosService } from './estructura-ligamento.service';

Module({
  imports: [TypeOrmModule.forFeature([EstructuraLigamentosEntity])],
  controllers: [EstructuraLigamentosController],
  providers: [EstructuraLigamentosService],
  exports: [EstructuraLigamentosService],
});
export class EstructuraLigamentosModule {}
