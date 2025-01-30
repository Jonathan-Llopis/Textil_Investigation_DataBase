import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../tela/tela.entity';
import { CreateTelaDto, UpdateTelaDto } from 'src/tela/tela.dto';
import { Cac_VisualEntity } from '../cac_visuales/cac_visuales.entity';

@Injectable()
export class TelaTipoCac_VisualesService {
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(Cac_VisualEntity)
    private readonly cacVisualesRepository: Repository<Cac_VisualEntity>,
  ) {}

  async addTelaToCacVisuales(
    createTelaDto: CreateTelaDto,
    id_tela: number,
  ): Promise<TelaEntity> {
    const { ids_cac_visuales } = createTelaDto;

    const tela = await this.telaRepository.findOne({
      where: { id_tela: id_tela },
      relations: ['cac_visuales'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    for (const visualId of ids_cac_visuales) {
      const cacVisual = await this.cacVisualesRepository.findOne({
        where: { id_cac_visual: visualId },
        relations: ['telas'],
      });
      if (!cacVisual) {
        throw new NotFoundException(`Cac Visual con id ${visualId} no encontrado`);
      }
      tela.caracteristicas_visuales.push(cacVisual);
    }

    return this.telaRepository.save(tela);
  }

  async findTelasByCacVisuales(
    id_cac_visual: string,  
  ): Promise<TelaEntity[]> {
    const cacVisuales = await this.cacVisualesRepository.find({
      where: { id_cac_visual },
      relations: ['telas'],
    });

    if (!cacVisuales) {
      throw new NotFoundException('Caracteristicas Visuales no encontradas');
    }

    return cacVisuales.telas;
  }
  

  async updateCacVisualesFromTela(
    id_tela: number,
    cacVisuales: number[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela},
      relations: ['cac_visuales'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const nuevasCacVisuales = [];
    for (const cacVisual of cacVisuales) {
      const visual = await this.cacVisualesRepository.findOne({
        where: { id_cac_visual: cacVisual },
        relations: ['telas'],
      });
      if (!visual) {
        throw new NotFoundException('Cac Visual no encontrado');
      }
    }

    tela.caracteristicas_visuales = nuevasCacVisuales;
    return this.telaRepository.save(tela);
  }

  async removeAllCacVisuales(id_tela: number): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela: id_tela },
      relations: ['cac_visuales'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    tela.caracteristicas_visuales = [];
    await this.telaRepository.save(tela);
  }

  async deleteCacVisualFromTela(
    id_tela: number,
    id_cac_visual: number,
  ): Promise<void> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela: id_tela },
      relations: ['cac_visuales'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    const cacVisual = tela.caracteristicas_visuales.find(
      (visual) => visual.id_cac_visual === id_cac_visual,
    );
    if (!cacVisual) {
      throw new NotFoundException('Cac Visual no encontrado en la Tela');
    }

    tela.caracteristicas_visuales = tela.caracteristicas_visuales.filter(
      (visual) => visual.id_cac_visual !== id_cac_visual,
    );
    await this.telaRepository.save(tela);
  }
}
