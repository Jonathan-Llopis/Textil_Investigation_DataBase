import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstructuraLigamentosEntity } from './estructura-ligamento.entity';
import {
  CreateEstructuraLigamentosDto,
  UpdateEstructuraLigamentosDto,
} from './estructura-ligamento.dto';

@Injectable()
export class EstructuraLigamentosService {
  constructor(
    @InjectRepository(EstructuraLigamentosEntity)
    private readonly estructuraRepository: Repository<EstructuraLigamentosEntity>,
  ) {}

  create(createEstructuraLigamentosDto: CreateEstructuraLigamentosDto) {
    const estructura = this.estructuraRepository.create(
      createEstructuraLigamentosDto,
    );
    return this.estructuraRepository.save(estructura);
  }

  findAll() {
    return this.estructuraRepository.find();
  }

  findOne(id: number) {
    return this.estructuraRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateEstructuraLigamentosDto: UpdateEstructuraLigamentosDto,
  ) {
    return this.estructuraRepository.update(id, updateEstructuraLigamentosDto);
  }

  remove(id: number) {
    return this.estructuraRepository.delete(id);
  }
}
