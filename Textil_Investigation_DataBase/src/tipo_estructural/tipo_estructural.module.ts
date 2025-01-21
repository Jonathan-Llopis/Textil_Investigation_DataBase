import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEstructuralController } from './tipo_estructural.controller';
import { TipoEstructuralService } from './tipo_estructural.service';
import { TipoEstructuralEntity } from './tipo_estructural.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEstructuralEntity])],
  controllers: [TipoEstructuralController],
  providers: [TipoEstructuralService],
  exports: [TipoEstructuralService],
})
export class TelaModule {}
