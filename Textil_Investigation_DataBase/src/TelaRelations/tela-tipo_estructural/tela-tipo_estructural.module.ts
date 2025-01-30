import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelaTipoEstructuralController } from './tela-tipo_estructural.controller';
import { TelaTipoEstructuralService } from './tela-tipo_estructural.service';
import { TelaEntity } from '../../tela/tela.entity';
import { TipoEstructuralEntity } from '../../tipo_estructural/tipo_estructural.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TelaEntity, TipoEstructuralEntity])],
  controllers: [TelaTipoEstructuralController],
  providers: [TelaTipoEstructuralService],
})
export class TelaTipoEstructuralModule {}
