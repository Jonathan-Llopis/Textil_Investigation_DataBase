import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estructura } from './estructura-ligamento.entity';
import { EstructuraController } from './estructura-ligamento.controller';
import { EstructuraService } from './estructura-ligamento.service';

Module({
    imports: [TypeOrmModule.forFeature([Estructura])],
    controllers: [EstructuraController],
    providers: [EstructuraService],
    exports: [EstructuraService],
  })
  export class EstructuraModule {}
