import { forwardRef, Module } from '@nestjs/common';
import { TelaController } from './tela.controller';
import { TelaService } from './tela.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelaEntity } from './tela.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TelaEntity]),
    forwardRef(() => FilesModule),
  ],
  controllers: [TelaController],
  providers: [TelaService],
  exports: [TelaService],
})
export class TelaModule {}
