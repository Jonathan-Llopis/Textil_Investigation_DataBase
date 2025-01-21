import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../utils/utils.module';
import { Conservacion } from './conservacion.entity';
import { ConservacionService } from './conservacion.service';
import { ConservacionController } from './conservacion.controller';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([Conservacion])],
  controllers: [ConservacionController],
  providers: [ConservacionService],
})
export class ConservacionModule {}
