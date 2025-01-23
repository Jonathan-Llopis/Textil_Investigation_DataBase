import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEstructuralController } from './tipo_estructural.controller';
import { TipoEstructuralService } from './tipo_estructural.service';
import { TipoEstructuralEntity } from './tipo_estructural.entity';
import { TelaEntity } from '../tela/tela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEstructuralEntity, TelaEntity])],
  controllers: [TipoEstructuralController],
  providers: [TipoEstructuralService],
  exports: [TipoEstructuralService],
})
export class TipoEstructuralModule {}
