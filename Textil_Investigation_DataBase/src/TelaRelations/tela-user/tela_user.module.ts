import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelaEntity } from '../../tela/tela.entity';
import { UserEntity } from '../../users/users.entity';
import { TelaUserController } from './tela_user.controller';
import { TelaUserService } from './tela_user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TelaEntity, UserEntity])],
  controllers: [TelaUserController],
  providers: [TelaUserService],
  exports: [TelaUserService],
})
export class TelaUserModule {}
