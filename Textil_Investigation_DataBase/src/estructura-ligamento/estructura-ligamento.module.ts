import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstructuraLigamentosEntity } from './estructura-ligamento.entity';
import { EstructuraLigamentosService } from './estructura-ligamento.service';
import { EstructuraLigamentosController } from './estructura-ligamento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EstructuraLigamentosEntity])],
  controllers: [EstructuraLigamentosController],
  providers: [EstructuraLigamentosService],
})
export class EstructuraLigamentosModule {}
