import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelaComposicionService } from './tela-composicion.service';
import { TelaComposicionController } from './tela-composicion.controller';
import { TelaEntity } from '../../tela/tela.entity';
import { ComposicionEntity } from '../../composicion/composicion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TelaEntity, ComposicionEntity])],
  controllers: [TelaComposicionController],
  providers: [TelaComposicionService],
  exports: [TelaComposicionService],
})
export class TelaComposicionModule {}
