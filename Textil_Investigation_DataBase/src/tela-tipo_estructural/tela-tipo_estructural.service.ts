import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../tela/tela.entity';
import { TipoEstructuralEntity } from 'src/tipo_estructural/tipo_estructural.entity';
import { CreateTelaDto } from 'src/tela/tela.dto';
@Injectable()
export class TelaTipoEstructuralService {
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(TipoEstructuralEntity)
    private readonly tipoEstructuralRepository: Repository<TipoEstructuralEntity>,
  ) {}

  async addTelaToTipoEstructural(
    createTelaDto: CreateTelaDto,
    id_tela: number,
  ): Promise<TelaEntity> {
    const { ids_tipo_estructural } = createTelaDto;

    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    for (const tipoId of ids_tipo_estructural) {
      const tipoEstructural = await this.tipoEstructuralRepository.findOne({
        where: { id_tipo_estructural: tipoId },
        relations: ['telas'],
      });
      if (!tipoEstructural) {
        throw new NotFoundException(
          `Tipo Estructural con id ${tipoId} no encontrado`,
        );
      }
      tela.tipo_estructurales.push(tipoEstructural);
    }

    return this.telaRepository.save(tela);
  }

  async findTelaFromTipoEstructural(
    id_tipo_estructural: number,
  ): Promise<TelaEntity[]> {
    const tipoEstructural = await this.tipoEstructuralRepository.findOne({
      where: { id_tipo_estructural },
      relations: ['telas'],
    });
    if (!tipoEstructural) {
      throw new NotFoundException('Tipo Estructural no encontrado');
    }
    return tipoEstructural.telas;
  }

  async updateTipoEstructuralesFromTela(
    id_tela: number,
    tipoEstructurales: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const nuevosTiposEstructurales = [];
    for (const tipoId of tipoEstructurales) {
      const tipo = await this.tipoEstructuralRepository.findOne({
        where: { id_tipo_estructural: tipoId },
        relations: ['telas'],
      });
      if (!tipo) {
        throw new NotFoundException(
          `Tipo Estructural con id ${tipoId} no encontrado`,
        );
      }
      nuevosTiposEstructurales.push(tipo);
    }

    tela.tipo_estructurales = nuevosTiposEstructurales;
    return this.telaRepository.save(tela);
  }

  async deleteTipoEstructuralFromTela(
    id_tela: number,
    id_tipo_estructural: number,
  ): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const tipoEstructural = tela.tipo_estructurales.find(
      (tipo) => tipo.id_tipo_estructural === id_tipo_estructural,
    );
    if (!tipoEstructural) {
      throw new NotFoundException('Tipo Estructural no encontrado en la Tela');
    }

    tela.tipo_estructurales = tela.tipo_estructurales.filter(
      (tipo) => tipo.id_tipo_estructural !== id_tipo_estructural,
    );
    await this.telaRepository.save(tela);
  }

  async removeAllTipoEstructuralesFromTela(id_tela: number): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.tipo_estructurales = [];
    await this.telaRepository.save(tela);
  }
}
