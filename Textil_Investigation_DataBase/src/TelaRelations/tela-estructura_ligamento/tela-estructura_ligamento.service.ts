import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../../tela/tela.entity';
import { EstructuraLigamentosEntity } from '../../estructura-ligamento/estructura-ligamento.entity';
import { CreateTelaDto, UpdateTelaDto } from 'src/tela/tela.dto';

@Injectable()
export class TelaEstructuraLigamentoService {
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(EstructuraLigamentosEntity)
    private readonly estructuraLigamentoRepository: Repository<EstructuraLigamentosEntity>,
  ) {}

  async addEstructuraLigamentoToTela(
    id_tela: number,
    ids_estructura_ligamento: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['estructura_ligamentos'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    for (const id of ids_estructura_ligamento) {
      const estructura = await this.estructuraLigamentoRepository.findOne({
        where: { id },
        relations: ['telas'],
      });
      if (!estructura) {
        throw new NotFoundException(`Estructura Ligamento con ID ${id} no encontrada`);
      }
      tela.estructura_ligamentos.push(estructura);
    }

    return this.telaRepository.save(tela);
  }

  async findTelasByEstructuraLigamento(
    id_estructura_ligamento: number,
  ): Promise<TelaEntity[]> {
    const estructura = await this.estructuraLigamentoRepository.findOne({
      where: { id: id_estructura_ligamento },
      relations: ['telas'],
    });
    if (!estructura) {
      throw new NotFoundException('Estructura Ligamento no encontrada');
    }
    return estructura.telas;
  }

  async updateEstructurasLigamentoFromTela(
    id_tela: number,
    ids_estructura_ligamento: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['estructura_ligamentos'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const nuevasEstructuras = [];
    for (const id of ids_estructura_ligamento) {
      const estructura = await this.estructuraLigamentoRepository.findOne({
        where: { id },
        relations: ['telas'],
      });
      if (!estructura) {
        throw new NotFoundException(`Estructura Ligamento con ID ${id} no encontrada`);
      }
      nuevasEstructuras.push(estructura);
    }

    tela.estructura_ligamentos = nuevasEstructuras;
    return this.telaRepository.save(tela);
  }

  async deleteEstructuraLigamentoFromTela(
    id_tela: number,
    id_estructura_ligamento: number,
  ): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['estructura_ligamentos'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.estructura_ligamentos = tela.estructura_ligamentos.filter(
      (e) => e.id !== id_estructura_ligamento,
    );
    await this.telaRepository.save(tela);
  }

  async removeAllEstructurasLigamentoFromTela(id_tela: number): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['estructura_ligamentos'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.estructura_ligamentos = [];
    await this.telaRepository.save(tela);
  }
}
