import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from '../tela/tela.entity';
import { CreateTelaDto, UpdateTelaDto } from 'src/tela/tela.dto';
import { CacVisualEntity } from 'src/cac_visuales/cac_visuales.entity';

@Injectable()
export class TelaTipoCac_VisualesService {
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
    @InjectRepository(CacVisualEntity)
    private readonly cacVisualesRepository: Repository<CacVisualEntity>,
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
        where: { id: visualId },
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
    searchCriteria: Partial<CacVisualEntity>,
  ): Promise<TelaEntity[]> {
    const cacVisuales = await this.cacVisualesRepository.find({
      where: searchCriteria,
      relations: ['telas'],
    });
  
    if (cacVisuales.length === 0) {
      throw new NotFoundException(
        'No se encontraron características visuales con los criterios especificados',
      );
    }
  
    const telas = cacVisuales.flatMap((visual) => visual.telas);
  
    if (telas.length === 0) {
      throw new NotFoundException('No se encontraron Telas relacionadas');
    }
  
    return Array.from(new Set(telas)); // Elimina duplicados en caso de Telas compartidas por múltiples CacVisuales
  }
  

  async updateCacVisualesFromTela(
    id_tela: number,
    cacVisuales: CacVisualEntity[],
  ): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela: id_tela },
      relations: ['cac_visuales'],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }

    for (const cacVisual of cacVisuales) {
      const visual = await this.cacVisualesRepository.findOne({
        where: { id: cacVisual.id },
        relations: ['telas'],
      });
      if (!visual) {
        throw new NotFoundException('Cac Visual no encontrado');
      }
    }

    tela.caracteristicas_visuales = cacVisuales;
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
      (visual) => visual.id === id_cac_visual,
    );
    if (!cacVisual) {
      throw new NotFoundException('Cac Visual no encontrado en la Tela');
    }

    tela.caracteristicas_visuales = tela.caracteristicas_visuales.filter(
      (visual) => visual.id !== id_cac_visual,
    );
    await this.telaRepository.save(tela);
  }
}
