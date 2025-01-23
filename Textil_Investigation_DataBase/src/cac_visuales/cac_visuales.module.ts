import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacVisual } from './cac_visuales.entity';
import { CacVisualesController } from './cac_visuales.controller';
import { CacVisualesService } from './cac_visuales.service';

@Module({
  imports: [TypeOrmModule.forFeature([CacVisual])],
  controllers: [CacVisualesController],
  providers: [CacVisualesService],
  exports: [CacVisualesService],
})
export class CacVisualesModule {}
