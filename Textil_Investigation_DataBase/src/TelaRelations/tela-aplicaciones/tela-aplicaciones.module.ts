import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelaAplicacionesService } from './tela-aplicaciones.service';
import { TelaAplicacionesController } from './tela-aplicaciones.controller';
import { TelaEntity } from '../../tela/tela.entity';
import { AplicacionesEntity } from '../../aplicaciones/aplicaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TelaEntity, AplicacionesEntity])],
  controllers: [TelaAplicacionesController],
  providers: [TelaAplicacionesService],
  exports: [TelaAplicacionesService],
})
export class TelaAplicacionesModule {}
