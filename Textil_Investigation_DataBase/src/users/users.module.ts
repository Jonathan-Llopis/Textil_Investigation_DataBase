import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UtilsModule } from '../utils/utils.module';
import { UserEntity } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../Autentication/auth.service';

@Module({
  imports: [
    UtilsModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
