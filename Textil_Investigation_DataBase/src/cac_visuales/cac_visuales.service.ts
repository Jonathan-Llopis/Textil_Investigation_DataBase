import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacVisualEntity } from './cac_visuales.entity';
import { CreateCacVisualDto, UpdateCacVisualDto } from './cac_visuales.dto';

@Injectable()
export class CacVisualesService {
  constructor(
    @InjectRepository(CacVisualEntity)
    private readonly cacVisualRepository: Repository<CacVisualEntity>,
  ) {}

  create(createCacVisualDto: CreateCacVisualDto) {
    const cacVisual = this.cacVisualRepository.create(createCacVisualDto);
    return this.cacVisualRepository.save(cacVisual);
  }

  findAll() {
    return this.cacVisualRepository.find();
  }

  findOne(id: number) {
    return this.cacVisualRepository.findOneBy({ id });
  }

  update(id: number, updateCacVisualDto: UpdateCacVisualDto) {
    return this.cacVisualRepository.update(id, updateCacVisualDto);
  }

  remove(id: number) {
    return this.cacVisualRepository.delete(id);
  }
}
