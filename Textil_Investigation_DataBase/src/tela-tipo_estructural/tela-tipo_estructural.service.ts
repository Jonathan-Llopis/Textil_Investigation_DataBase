import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../tela/tela.entity';
import { TipoEstructuralEntity } from 'src/tipo_estructural/tipo_estructural.entity';
import { CreateTelaDto, UpdateTelaDto } from 'src/tela/tela.dto';
@Injectable()
export class TelaTipoEstructuralService {
  findTelasByTipoEstructuralId(arg0: number) {
    throw new Error('Method not implemented.');
  }
  removeAllTipoEstructural(idTela: number) {
    throw new Error('Method not implemented.');
  }
  updateTipoEstructural(idTela: number, updateTelaTipoEstructuralDto: UpdateTelaDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(TipoEstructuralEntity)
    private readonly tipoEstructuralRepository: Repository<TipoEstructuralEntity>,

  ) {}

  async addTelaToTipoEstructural(createTelaDto: CreateTelaDto, id_tela: number): Promise<TelaEntity> {
    const {id_tipo_estructural } = createTelaDto;

    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const tipoEstructural = await this.tipoEstructuralRepository.findOne({
      where: { id_tipo_estructural },
      relations: ['telas'],
    });
    if (!tipoEstructural) {
      throw new NotFoundException('Tipo Estructural no encontrado');
    }

    tela.tipo_estructurales.push(tipoEstructural);
    return this.telaRepository.save(tela);
  }

  async findTipoEstructuralFromTela(id_tela: number, id_tipo_estructural: number): Promise<TipoEstructuralEntity> {
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

    return tipoEstructural;
  }

  async findTipoEstructuralesFromTela(id_tela: number): Promise<TipoEstructuralEntity[]> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    return tela.tipo_estructurales;
  }

  async updateTipoEstructuralesFromTela(id_tela: number, tipoEstructurales: TipoEstructuralEntity[]): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    for (const tipoEstructural of tipoEstructurales) {
      const tipo = await this.tipoEstructuralRepository.findOne({
        where: { id_tipo_estructural: tipoEstructural.id_tipo_estructural },
        relations: ['telas'],
      });
      if (!tipo) {
        throw new NotFoundException('Tipo Estructural no encontrado');
      }
    }

    tela.tipo_estructurales = tipoEstructurales;
    return this.telaRepository.save(tela);
  }

  async deleteTipoEstructuralFromTela(id_tela: number, id_tipo_estructural: number): Promise<void> {
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
}
