import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../../tela/tela.entity';
import { UserEntity } from '../../users/users.entity';

@Injectable()
export class TelaUserService {
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Agregar un usuario a una tela
  async addUserToTela(id_tela: number, id_user: number): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['users'],
    });
    const user = await this.userRepository.findOne({ where: { id_user } });

    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Asociar el usuario con la tela
    tela.users.push(user);
    return this.telaRepository.save(tela);
  }

  // Obtener usuarios de una tela
  async findUsersByTela(id_tela: number): Promise<UserEntity[]> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['users'],
    });

    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    return tela.users;
  }

  // Eliminar un usuario de una tela
  async removeUserFromTela(id_tela: number, id_user: number): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['users'],
    });
    const user = await this.userRepository.findOne({ where: { id_user } });

    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Eliminar la relación entre el usuario y la tela
    tela.users = tela.users.filter((u) => u.id_user !== user.id_user);
    await this.telaRepository.save(tela);
  }

  // Eliminar todos los usuarios de una tela
  async removeAllUsersFromTela(id_tela: number): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['users'],
    });

    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    // Eliminar todos los usuarios de la tela
    tela.users = [];
    await this.telaRepository.save(tela);
  }
}
