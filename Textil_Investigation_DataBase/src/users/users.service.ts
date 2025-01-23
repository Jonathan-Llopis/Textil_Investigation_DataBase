import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UtilsService } from '../utils/utils.service';
import { UserEntity } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
@Injectable()
export class UsersService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getAllUser(xml?: string): Promise<UserEntity[] | string> {
    const users = await this.usersRepository.find({
      relations: [],
    });
    if (xml === 'true') {
      const jsonformatted = JSON.stringify({
        users,
      });
      return this.utilsService.convertJSONtoXML(jsonformatted);
    } else {
      return users;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const usuario = await this.usersRepository.create(createUserDto);
    const passwordHash = await bcrypt.hash(await usuario.password, 10);
    usuario.password = passwordHash;
    return this.usersRepository.save(usuario);
  }

  async getUser(
    id_user: number,
    xml?: string,
  ): Promise<UserEntity | string | null> {
    const userEntity = await this.usersRepository.findOne({
      where: { id_user: id_user },
      relations: [],
    });

    if (userEntity != null) {
      if (xml == 'true') {
        const jsonformatted = JSON.stringify(userEntity);
        return this.utilsService.convertJSONtoXML(jsonformatted);
      } else {
        return userEntity;
      }
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    id_user: number,
  ): Promise<UserEntity> {
    const userEntity = await this.usersRepository.findOne({
      where: { id_user: id_user },
    });

    if (!userEntity) {
      throw new Error('Usuario no encontrado');
    }

    if (userEntity.email != updateUserDto.email) {
      userEntity.email = updateUserDto.email;
    }

    userEntity.username = updateUserDto.username;

    return this.usersRepository.save(userEntity);
  }
  async deleteUser(id_user: number): Promise<void> {
    await this.usersRepository.delete({ id_user });
  }
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
