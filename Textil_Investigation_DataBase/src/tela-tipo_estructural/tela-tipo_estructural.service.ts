import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../tela/tela.entity';
import { TipoEstructuralEntity } from 'src/tipo_estructural/tipo_estructural.entity';
import { TelaTipoEstructuralEntity } from './tela-tipo_estructural.entity';
import {
  CreateTelaTipoEstructuralDto,
  UpdateTelaTipoEstructuralDto,
} from './tela-tipo_estructural.dto';

@Injectable()
export class TelaTipoEstructuralService {
  constructor(
    @InjectRepository(TelaTipoEstructuralEntity)
    private readonly telaTipoEstructuralRepository: Repository<TelaTipoEstructuralEntity>,
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(TipoEstructuralEntity)
    private readonly tipoEstructuralRepository: Repository<TipoEstructuralEntity>,
  ) {}

  // Agregar una nueva relación entre Tela y TipoEstructural
  async add(
    createTelaTipoEstructuralDto: CreateTelaTipoEstructuralDto,
  ): Promise<TelaTipoEstructuralEntity> {
    const { id_tela, id_tipo_estructural } = createTelaTipoEstructuralDto;

    // Buscar la tela y el tipo estructural
    const tela = await this.telaRepository.findOne({
      where: { id_tela: id_tela },
    });
    const tipoEstructural = await this.tipoEstructuralRepository.findOne({
      where: { id_tipo_estructural: id_tipo_estructural },
    });

    if (!tela || !tipoEstructural) {
      throw new NotFoundException('Tela o Tipo Estructural no encontrado');
    }

    const telaTipoEstructural = this.telaTipoEstructuralRepository.create({
      tela,
      tipo_estructural: tipoEstructural,
    });

    return this.telaTipoEstructuralRepository.save(telaTipoEstructural);
  }

  // Actualizar la relación entre Tela y TipoEstructural
  async update(
    idTela: number,
    updateTelaTipoEstructuralDto: UpdateTelaTipoEstructuralDto,
  ): Promise<TelaTipoEstructuralEntity> {
    const tipoEstructural = await this.telaTipoEstructuralRepository.findOne({
      where: { tela: { id_tela: idTela } },
    });

    if (!tipoEstructural) {
      throw new NotFoundException('Relación no encontrada');
    }

    // Actualizamos la relación con los nuevos valores
    Object.assign(tipoEstructural, updateTelaTipoEstructuralDto);

    return this.telaTipoEstructuralRepository.save(tipoEstructural);
  }

  // Eliminar todos los TipoEstructural de una Tela
  async removeAll(idTela: number): Promise<void> {
    const result = await this.telaTipoEstructuralRepository.delete({
      tela: { id_tela: idTela },
    });
    if (result.affected === 0) {
      throw new NotFoundException('No se encontraron relaciones para eliminar');
    }
  }

  // Eliminar un TipoEstructural específico de una Tela
  async remove(idTela: number, idTipoEstructural: number): Promise<void> {
    const result = await this.telaTipoEstructuralRepository.delete({
      tela: { id_tela: idTela },
      tipo_estructural: { id_tipo_estructural: idTipoEstructural },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Relación no encontrada para eliminar');
    }
  }
}
