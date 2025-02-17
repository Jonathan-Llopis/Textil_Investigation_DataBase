import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AplicacionesEntity } from './aplicaciones.entity';
import { CreateAplicacionDto, UpdateAplicacionDto } from './aplicaciones.dto';

@Injectable()
export class AplicacionesService {
  constructor(
    @InjectRepository(AplicacionesEntity)
    private readonly aplicacionesRepository: Repository<AplicacionesEntity>,
  ) {}

  // Crear una nueva aplicación
  async create(
    createAplicacionDto: CreateAplicacionDto,
  ): Promise<AplicacionesEntity> {
    const aplicacion = this.aplicacionesRepository.create(createAplicacionDto);
    return this.aplicacionesRepository.save(aplicacion);
  }

  // Obtener todas las aplicaciones
  async findAll(): Promise<AplicacionesEntity[]> {
    return this.aplicacionesRepository.find();
  }

  // Obtener una aplicación por ID
  async findOne(id: number): Promise<AplicacionesEntity> {
    const aplicacion = await this.aplicacionesRepository.findOne({
      where: { id_aplicaciones: id },
    });
    if (!aplicacion) {
      throw new NotFoundException('Aplicación no encontrada');
    }
    return aplicacion;
  }

  // Actualizar una aplicación por ID
  async update(
    id: number,
    updateAplicacionDto: UpdateAplicacionDto,
  ): Promise<AplicacionesEntity> {
    const aplicacion = await this.aplicacionesRepository.findOne({
      where: { id_aplicaciones: id },
    });
    if (!aplicacion) {
      throw new NotFoundException('Aplicación no encontrada');
    }
    Object.assign(aplicacion, updateAplicacionDto);
    return this.aplicacionesRepository.save(aplicacion);
  }

  // Eliminar una aplicación por ID
  async remove(id: number): Promise<void> {
    const result = await this.aplicacionesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Aplicación no encontrada');
    }
  }
  // Obtener una aplicación por nombre
  async findByName(name: string): Promise<AplicacionesEntity> {
    const aplicacion = await this.aplicacionesRepository.findOne({
      where: { tipo_aplicacion: name },
    });
    return aplicacion;
  }
}
