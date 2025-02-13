import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cac_VisualEntity } from './cac_visuales.entity';
import { CreateCacVisualDto, UpdateCacVisualDto } from './cac_visuales.dto';

@Injectable()
export class CacVisualesService {
  constructor(
    @InjectRepository(Cac_VisualEntity)
    private readonly cacVisualRepository: Repository<Cac_VisualEntity>,
  ) {}

  create(createCacVisualDto: CreateCacVisualDto) {
    const cacVisual = this.cacVisualRepository.create(createCacVisualDto);
    return this.cacVisualRepository.save(cacVisual);
  }

  findAll() {
    return this.cacVisualRepository.find();
  }

  findOne(id: number) {
    return this.cacVisualRepository.findOneBy({ id_cac_visual: id });
  }

  update(id: number, updateCacVisualDto: UpdateCacVisualDto) {
    return this.cacVisualRepository.update(id, updateCacVisualDto);
  }

  remove(id: number) {
    return this.cacVisualRepository.delete(id);
  }

  findByAttributes(transparencia: number, brillo: number, tacto: number) {
    return this.cacVisualRepository.findOneBy({ transparencia, brillo, tacto });
  }
}
