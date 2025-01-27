import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacVisual } from './cac_visuales.entity';
import { CreateCacVisualDto } from './dtos/create_cac_visuales.dto';
import { UpdateCacVisualDto } from './dtos/update-cac_visual.dto';

@Injectable()
export class CacVisualesService {
  constructor(
    @InjectRepository(CacVisual)
    private readonly cacVisualRepository: Repository<CacVisual>,
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
