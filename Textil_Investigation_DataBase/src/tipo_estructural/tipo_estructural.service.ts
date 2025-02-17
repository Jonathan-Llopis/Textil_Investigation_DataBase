import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoEstructuralEntity } from './tipo_estructural.entity';
import {
  CreateTipoEstructuralDto,
  UpdateTipoEstructuralDto,
} from './tipo_estructural.dto';

@Injectable()
export class TipoEstructuralService {
  constructor(
    @InjectRepository(TipoEstructuralEntity)
    private readonly tipoEstructuralRepository: Repository<TipoEstructuralEntity>,
  ) {}

  // Crear un nuevo tipo estructural
  async create(
    createTipoEstructuralDto: CreateTipoEstructuralDto,
  ): Promise<TipoEstructuralEntity> {
    const tipoEstructural = this.tipoEstructuralRepository.create(
      createTipoEstructuralDto,
    );
    return this.tipoEstructuralRepository.save(tipoEstructural);
  }

  // Obtener todos los tipos estructurales
  async findAll(): Promise<TipoEstructuralEntity[]> {
    return this.tipoEstructuralRepository.find();
  }

  // Obtener un tipo estructural por ID
  async findOne(id: number): Promise<TipoEstructuralEntity> {
    const tipoEstructural = await this.tipoEstructuralRepository.findOne({
      where: { id_tipo_estructural: id },
    });
    if (!tipoEstructural) {
      throw new NotFoundException('Tipo estructural no encontrado');
    }
    return tipoEstructural;
  }

  // Actualizar un tipo estructural por ID
  async update(
    id: number,
    updateTipoEstructuralDto: UpdateTipoEstructuralDto,
  ): Promise<TipoEstructuralEntity> {
    const tipoEstructural = await this.tipoEstructuralRepository.findOne({
      where: { id_tipo_estructural: id },
    });

    Object.assign(tipoEstructural, updateTipoEstructuralDto);

    return this.tipoEstructuralRepository.save(tipoEstructural);
  }

  // Eliminar un tipo estructural por ID
  async remove(id: number): Promise<void> {
    const result = await this.tipoEstructuralRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Tipo estructural no encontrado');
    }
  }
  // Obtener un tipo estructural por nombre
  async findByName(name: string): Promise<TipoEstructuralEntity> {
    const tipoEstructural = await this.tipoEstructuralRepository.findOne({
      where: { tipo: name },
    });
  
    return tipoEstructural;
  }
}
