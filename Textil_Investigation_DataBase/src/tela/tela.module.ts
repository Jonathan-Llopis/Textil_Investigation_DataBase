import { Module } from '@nestjs/common';
import { TelaController } from './tela.controller';
import { TelaService } from './tela.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tela } from './tela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tela])],
  controllers: [TelaController],
  providers: [TelaService],
  exports: [TelaService],
})
export class TelaModule {}
