import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Composicion } from './composicion.entity';
import { CreateComposicionDto } from './dtos/create.dto';
import { UpdateComposicionDto } from './dtos/update.dto';

@Injectable()
export class ComposicionService {
  constructor(
    @InjectRepository(Composicion)
    private readonly composicionRepository: Repository<Composicion>,
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
}
