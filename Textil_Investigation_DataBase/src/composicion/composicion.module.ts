import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Composicion } from './composicion.entity';
import { ComposicionController } from './composicion.controller';
import { ComposicionService } from './composicion.service';


@Module({
  imports: [TypeOrmModule.forFeature([Composicion])],
  controllers: [ComposicionController],
  providers: [ComposicionService],
  exports: [ComposicionService],
})
export class ComposicionModule {}
