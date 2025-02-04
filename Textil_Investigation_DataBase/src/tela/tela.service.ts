import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelaEntity } from './tela.entity';
import { CreateTelaDto, FilterTelaDto } from './tela.dto';
import { UpdateTelaDto } from './tela.dto';

@Injectable()
export class TelaService {
  constructor(
    @InjectRepository(TelaEntity)
    private readonly telaRepository: Repository<TelaEntity>,
  ) {}

  // Crear una nueva tela
  async create(createTelaDto: CreateTelaDto): Promise<TelaEntity> {
    const tela = this.telaRepository.create(createTelaDto);
    return this.telaRepository.save(tela);
  }

  // Obtener todas las telas
  async findAll(): Promise<TelaEntity[]> {
    return this.telaRepository.find({
      relations: [
        'users',
        'composiciones',
        'tipo_estructurales',
        'aplicaciones_tela',
        'caracteristicas_tecnicas',
        'caracteristicas_visuales',
        'conservaciones',
        'estructura_ligamentos',
      ],
    });
  }

  // Obtener una tela por ID
  async findOne(id: number): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({
      where: { id_tela: id },
      relations: [
        'users',
        'composiciones',
        'tipo_estructurales',
        'aplicaciones_tela',
        'caracteristicas_tecnicas',
        'caracteristicas_visuales',
        'conservaciones',
        'estructura_ligamentos',
      ],
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }
    return tela;
  }

  // Actualizar una tela por ID
  async update(id: number, updateTelaDto: UpdateTelaDto): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOne({ where: { id_tela: id } });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }
    Object.assign(tela, updateTelaDto);
    return this.telaRepository.save(tela);
  }

  // Eliminar una tela por ID
  async remove(id: number): Promise<void> {
    const result = await this.telaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Tela no encontrada');
    }
  }

  async filterTelas(filterTelaDto: FilterTelaDto): Promise<TelaEntity[]> {
    const queryBuilder = this.telaRepository.createQueryBuilder('tela');

    if (filterTelaDto.denominacion) {
      queryBuilder.andWhere('tela.denominacion LIKE :denominacion', {
        denominacion: `%${filterTelaDto.denominacion}%`,
      });
    }

    if (filterTelaDto.ids_aplicaciones) {
      queryBuilder.andWhere('tela.aplicaciones IN (:...ids_aplicaciones)', {
        ids_aplicaciones: filterTelaDto.ids_aplicaciones,
      });
    }

    if (filterTelaDto.ids_tipo_estructural) {
      queryBuilder.andWhere(
        'tela.tipo_estructural IN (:...ids_tipo_estructural)',
        {
          ids_tipo_estructural: filterTelaDto.ids_tipo_estructural,
        },
      );
    }

    if (filterTelaDto.ids_composicion) {
      queryBuilder.andWhere('tela.composicion IN (:...ids_composicion)', {
        ids_composicion: filterTelaDto.ids_composicion,
      });
    }

    if (filterTelaDto.ids_conservacion) {
      queryBuilder.andWhere('tela.conservacion IN (:...ids_conservacion)', {
        ids_conservacion: filterTelaDto.ids_conservacion,
      });
    }

    if (filterTelaDto.ids_estructura_ligamento) {
      queryBuilder.andWhere(
        'tela.estructura_ligamento IN (:...ids_estructura_ligamento)',
        {
          ids_estructura_ligamento: filterTelaDto.ids_estructura_ligamento,
        },
      );
    }

    if (filterTelaDto.ids_cac_tecnica) {
      queryBuilder.andWhere('tela.cac_tecnica IN (:...ids_cac_tecnica)', {
        ids_cac_tecnica: filterTelaDto.ids_cac_tecnica,
      });
    }

    if (filterTelaDto.ids_cac_visuales) {
      queryBuilder.andWhere('tela.cac_visual IN (:...ids_cac_visuales)', {
        ids_cac_visuales: filterTelaDto.ids_cac_visuales,
      });
    }

    return await queryBuilder.getMany();
  }
}
