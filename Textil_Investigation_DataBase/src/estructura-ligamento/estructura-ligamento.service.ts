import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstructuraLigamentosEntity } from './estructura-ligamento.entity';
import { CreateEstructuraDto, UpdateEstructuraDto } from './estructura-ligamento.dto';

@Injectable()
export class EstructuraService {
  constructor(
    @InjectRepository(EstructuraLigamentosEntity)
    private readonly estructuraRepository: Repository<EstructuraLigamentosEntity>,
  ) {}

  create(createEstructuraDto: CreateEstructuraDto) {
    const estructura = this.estructuraRepository.create(createEstructuraDto);
    return this.estructuraRepository.save(estructura);
  }

  findAll() {
    return this.estructuraRepository.find();
  }

  findOne(id: number) {
    return this.estructuraRepository.findOneBy({ id });
  }

  update(id: number, updateEstructuraDto: UpdateEstructuraDto) {
    return this.estructuraRepository.update(id, updateEstructuraDto);
  }

  remove(id: number) {
    return this.estructuraRepository.delete(id);
  }
}
