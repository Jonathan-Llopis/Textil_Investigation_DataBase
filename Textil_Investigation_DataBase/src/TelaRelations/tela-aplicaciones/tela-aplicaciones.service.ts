import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../../tela/tela.entity';
import { AplicacionesEntity } from '../../aplicaciones/aplicaciones.entity';

@Injectable()
export class TelaAplicacionesService {
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(AplicacionesEntity)
    private readonly aplicacionesRepository: Repository<AplicacionesEntity>,
  ) {}

  async addAplicacionesToTela(
    id_tela: number,
    ids_aplicaciones: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['aplicaciones_tela'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    for (const id of ids_aplicaciones) {
      const aplicacion = await this.aplicacionesRepository.findOne({
        where: { id_aplicaciones: id },
        relations: ['telas'],
      });
      if (!aplicacion) {
        throw new NotFoundException(`Aplicación con ID ${id} no encontrada`);
      }
      tela.aplicaciones_tela.push(aplicacion);
    }

    return this.telaRepository.save(tela);
  }

  async findTelasByAplicacion(id_aplicaciones: number): Promise<TelaEntity[]> {
    const aplicacion = await this.aplicacionesRepository.findOne({
      where: { id_aplicaciones },
      relations: ['telas'],
    });
    if (!aplicacion) {
      throw new NotFoundException('Aplicación no encontrada');
    }
    return aplicacion.telas;
  }

  async updateAplicacionesFromTela(
    id_tela: number,
    ids_aplicaciones: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['aplicaciones_tela'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const nuevasAplicaciones = [];
    for (const id of ids_aplicaciones) {
      const aplicacion = await this.aplicacionesRepository.findOne({
        where: { id_aplicaciones: id },
        relations: ['telas'],
      });
      if (!aplicacion) {
        throw new NotFoundException(`Aplicación con ID ${id} no encontrada`);
      }
      nuevasAplicaciones.push(aplicacion);
    }

    tela.aplicaciones_tela = nuevasAplicaciones;
    return this.telaRepository.save(tela);
  }

  async deleteAplicacionFromTela(
    id_tela: number,
    id_aplicaciones: number,
  ): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['aplicaciones_tela'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.aplicaciones_tela = tela.aplicaciones_tela.filter(
      (e) => e.id_aplicaciones !== id_aplicaciones,
    );
    await this.telaRepository.save(tela);
  }

  async removeAllAplicacionesFromTela(id_tela: number): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['aplicaciones_tela'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.aplicaciones_tela = [];
    await this.telaRepository.save(tela);
  }
}
