import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelaEntity } from '../../tela/tela.entity';
import { ConservacionEntity } from '../../conservacion/conservacion.entity';
import { TelaConservacionController } from './tela-composicion.controller';
import { TelaConservacionService } from './tela-composicion.service';

@Module({
  imports: [TypeOrmModule.forFeature([TelaEntity, ConservacionEntity])],
  controllers: [TelaConservacionController],
  providers: [TelaConservacionService],
  exports: [TelaConservacionService],
})
export class TelaConservacionModule {}
