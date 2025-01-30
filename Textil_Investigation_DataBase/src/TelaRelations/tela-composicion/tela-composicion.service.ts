import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../../tela/tela.entity';
import { ComposicionEntity } from '../../composicion/composicion.entity';

@Injectable()
export class TelaComposicionService {
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(ComposicionEntity)
    private readonly composicionRepository: Repository<ComposicionEntity>,
  ) {}

  async addComposicionToTela(
    id_tela: number,
    ids_composicion: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['composiciones'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    for (const id of ids_composicion) {
      const composicion = await this.composicionRepository.findOne({
        where: { id },
        relations: ['telas'],
      });
      if (!composicion) {
        throw new NotFoundException(`Composición con ID ${id} no encontrada`);
      }
      tela.composiciones.push(composicion);
    }

    return this.telaRepository.save(tela);
  }

  async findTelasByComposicion(id_composicion: number): Promise<TelaEntity[]> {
    const composicion = await this.composicionRepository.findOne({
      where: { id: id_composicion },
      relations: ['telas'],
    });
    if (!composicion) {
      throw new NotFoundException('Composición no encontrada');
    }
    return composicion.telas;
  }

  async updateComposicionesFromTela(
    id_tela: number,
    ids_composicion: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['composiciones'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const nuevasComposiciones = [];
    for (const id of ids_composicion) {
      const composicion = await this.composicionRepository.findOne({
        where: { id },
        relations: ['telas'],
      });
      if (!composicion) {
        throw new NotFoundException(`Composición con ID ${id} no encontrada`);
      }
      nuevasComposiciones.push(composicion);
    }

    tela.composiciones = nuevasComposiciones;
    return this.telaRepository.save(tela);
  }

  async deleteComposicionFromTela(
    id_tela: number,
    id_composicion: number,
  ): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['composiciones'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.composiciones = tela.composiciones.filter(
      (e) => e.id !== id_composicion,
    );
    await this.telaRepository.save(tela);
  }

  async removeAllComposicionesFromTela(id_tela: number): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['composiciones'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.composiciones = [];
    await this.telaRepository.save(tela);
  }
}
