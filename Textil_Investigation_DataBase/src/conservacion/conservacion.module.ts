import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../utils/utils.module';
import { ConservacionEntity } from './conservacion.entity';
import { ConservacionService } from './conservacion.service';
import { ConservacionController } from './conservacion.controller';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([ConservacionEntity])],
  controllers: [ConservacionController],
  providers: [ConservacionService],
  exports: [ConservacionService]
})
export class ConservacionModule {}
