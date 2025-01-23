import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../utils/utils.module';
import { Cac_TecnicasService } from './cac_tecnicas.service';
import { Cac_TecnicasController } from './cac_tecnicas.controller';
import { Cac_TecnicasEntity } from './cac_tecnicas.entity';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([Cac_TecnicasEntity])],
  controllers: [Cac_TecnicasController],
  providers: [Cac_TecnicasService],
})
export class CacTecnicasModule {}
