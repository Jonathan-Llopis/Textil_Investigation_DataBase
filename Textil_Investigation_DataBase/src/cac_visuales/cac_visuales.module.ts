import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacVisualEntity } from './cac_visuales.entity';
import { CacVisualesController } from './cac_visuales.controller';
import { CacVisualesService } from './cac_visuales.service';

@Module({
  imports: [TypeOrmModule.forFeature([CacVisualEntity])],
  controllers: [CacVisualesController],
  providers: [CacVisualesService],
  exports: [CacVisualesService],
})
export class CacVisualesModule {}
