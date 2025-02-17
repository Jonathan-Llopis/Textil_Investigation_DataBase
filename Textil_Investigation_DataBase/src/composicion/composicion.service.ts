import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComposicionEntity } from './composicion.entity';
import { CreateComposicionDto, UpdateComposicionDto } from './composicion.dto';

@Injectable()
export class ComposicionService {
  constructor(
    @InjectRepository(ComposicionEntity)
    private readonly composicionRepository: Repository<ComposicionEntity>,
  ) {}

  create(createComposicionDto: CreateComposicionDto) {
    const composicion = this.composicionRepository.create(createComposicionDto);
    return this.composicionRepository.save(composicion);
  }

  findAll() {
    return this.composicionRepository.find();
  }

  findOne(id: number) {
    return this.composicionRepository.findOneBy({ id });
  }

  update(id: number, updateComposicionDto: UpdateComposicionDto) {
    return this.composicionRepository.update(id, updateComposicionDto);
  }

  remove(id: number) {
    return this.composicionRepository.delete(id);
  }
  async findByName(name: string): Promise<ComposicionEntity> {
    const composicion = await this.composicionRepository.findOne({
      where: { descripcion: name },
    });
    return composicion;
  }
}
