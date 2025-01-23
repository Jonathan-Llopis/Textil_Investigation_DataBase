import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicacionesEntity } from './aplicaciones.enttity';
import { AplicacionesController } from './aplicaciones.controller';
import { AplicacionesService } from './aplicaciones.service';
import { TelaEntity } from '../tela/tela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AplicacionesEntity, TelaEntity])],
  controllers: [AplicacionesController],
  providers: [AplicacionesService],
  exports: [AplicacionesService],
})
export class AplicacionesModule {}
