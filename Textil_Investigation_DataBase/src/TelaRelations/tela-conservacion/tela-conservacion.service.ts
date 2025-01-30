import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../../tela/tela.entity';
import { ConservacionEntity } from '../../conservacion/conservacion.entity';

@Injectable()
export class TelaConservacionService {
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(ConservacionEntity)
    private readonly conservacionRepository: Repository<ConservacionEntity>,
  ) {}

  async addConservacionToTela(
    id_tela: number,
    ids_conservacion: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['conservaciones'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    for (const id of ids_conservacion) {
      const conservacion = await this.conservacionRepository.findOne({
        where: { id },
        relations: ['telas'],
      });
      if (!conservacion) {
        throw new NotFoundException(`Conservación con ID ${id} no encontrada`);
      }
      tela.conservaciones.push(conservacion);
    }

    return this.telaRepository.save(tela);
  }

  async findTelasByConservacion(
    id_conservacion: number,
  ): Promise<TelaEntity[]> {
    const conservacion = await this.conservacionRepository.findOne({
      where: { id: id_conservacion },
      relations: ['telas'],
    });
    if (!conservacion) {
      throw new NotFoundException('Conservación no encontrada');
    }
    return conservacion.telas;
  }

  async updateConservacionesFromTela(
    id_tela: number,
    ids_conservacion: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['conservaciones'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const nuevasConservaciones = [];
    for (const id of ids_conservacion) {
      const conservacion = await this.conservacionRepository.findOne({
        where: { id },
        relations: ['telas'],
      });
      if (!conservacion) {
        throw new NotFoundException(`Conservación con ID ${id} no encontrada`);
      }
      nuevasConservaciones.push(conservacion);
    }

    tela.conservaciones = nuevasConservaciones;
    return this.telaRepository.save(tela);
  }

  async deleteConservacionFromTela(
    id_tela: number,
    id_conservacion: number,
  ): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['conservaciones'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.conservaciones = tela.conservaciones.filter(
      (e) => e.id !== id_conservacion,
    );
    await this.telaRepository.save(tela);
  }

  async removeAllConservacionesFromTela(id_tela: number): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['conservaciones'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.conservaciones = [];
    await this.telaRepository.save(tela);
  }
}
