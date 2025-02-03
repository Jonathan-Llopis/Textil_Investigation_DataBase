import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../../tela/tela.entity';
import { CreateTelaDto } from '../../tela/tela.dto';
import { Cac_TecnicasEntity } from '../../cac_tecnicas/cac_tecnicas.entity';
@Injectable()
export class TelaCacTecnicasService {
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(Cac_TecnicasEntity)
    private readonly cacTecnicasRepository: Repository<Cac_TecnicasEntity>,
  ) {}

  async addTelaToCacTecnicas(
    createTelaDto: CreateTelaDto,
    id_tela: number,
  ): Promise<TelaEntity> {
    const { ids_cac_tecnica } = createTelaDto;

    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    for (const tipoId of ids_cac_tecnica) {
      const cacTecnicas = await this.cacTecnicasRepository.findOne({
        where: { id: tipoId },
        relations: ['telas'],
      });
      if (!cacTecnicas) {
        throw new NotFoundException(
          `Tipo Estructural con id ${tipoId} no encontrado`,
        );
      }
      tela.caracteristicas_tecnicas.push(cacTecnicas);
    }

    return this.telaRepository.save(tela);
  }

  async findTelaFromCacTecnicas(
    id1: number,
    id2: number,
    id3: number,
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository
      .createQueryBuilder('tela')
      .leftJoinAndSelect('tela.caracteristicas_tecnicas', 'cac_tecnicas')
      .where('cac_tecnicas.id IN (:...ids)', { ids: [id1, id2, id3] })
      .groupBy('tela.id')
      .having('COUNT(cac_tecnicas.id) = 3')
      .getOne();

    if (!tela) {
      throw new NotFoundException(
        'Tela no encontrada con las características técnicas proporcionadas',
      );
    }

    return tela;
  }

  async updateCacTecnicasFromTela(
    id_tela: number,
    cacTecnicases: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const nuevosCacTecnicas = [];
    for (const tipoId of cacTecnicases) {
      const tipo = await this.cacTecnicasRepository.findOne({
        where: { id: tipoId },
        relations: ['telas'],
      });
      if (!tipo) {
        throw new NotFoundException(
          `Tipo Estructural con id ${tipoId} no encontrado`,
        );
      }
      nuevosCacTecnicas.push(tipo);
    }

    tela.caracteristicas_tecnicas = nuevosCacTecnicas;
    return this.telaRepository.save(tela);
  }

  async removeCacTecnicasFromTela(
    id_tela: number,
    id_cac_tecnicas: number,
  ): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const cacTecnicas = tela.caracteristicas_tecnicas.find(
      (tipo) => tipo.id === id_cac_tecnicas,
    );
    if (!cacTecnicas) {
      throw new NotFoundException('Tipo Estructural no encontrado en la Tela');
    }

    tela.caracteristicas_tecnicas = tela.caracteristicas_tecnicas.filter(
      (tipo) => tipo.id !== id_cac_tecnicas,
    );
    await this.telaRepository.save(tela);
  }

  async removeAllCacTecnicasFromTela(id_tela: number): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela },
      relations: ['tipo_estructural'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.caracteristicas_tecnicas = [];
    await this.telaRepository.save(tela);
  }
}
