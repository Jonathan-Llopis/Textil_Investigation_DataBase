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

  async findByDenominacion(denominacion: string): Promise<TelaEntity[]> {
    return this.telaRepository.find({
      where: { denominacion: denominacion },
    });
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
    const tela = await this.telaRepository.findOneBy({ id_tela: id });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }
    tela.id_img = updateTelaDto.id_img;
    return this.telaRepository.save(tela);
  }

  async updateImg(nombreTela: string, idImagen: string): Promise<TelaEntity> {
    function normalizeText(text: string): string {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const normalizedNombreTela = normalizeText(nombreTela);
    const tela = await this.telaRepository.findOne({
      where: { denominacion: normalizedNombreTela },
    });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }
    tela.id_img = idImagen.toString();
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
    const queryBuilder = this.telaRepository.createQueryBuilder('tela')
      .leftJoinAndSelect('tela.aplicaciones_tela', 'aplicaciones_tela')
      .leftJoinAndSelect('tela.tipo_estructurales', 'tipo_estructurales')
      .leftJoinAndSelect('tela.composiciones', 'composiciones')
      .leftJoinAndSelect('tela.conservaciones', 'conservaciones')
      .leftJoinAndSelect('tela.estructura_ligamentos', 'estructura_ligamentos')
      .leftJoinAndSelect('tela.caracteristicas_tecnicas', 'caracteristicas_tecnicas')
      .leftJoinAndSelect('tela.caracteristicas_visuales', 'caracteristicas_visuales');

    if (filterTelaDto.denominacion) {
      queryBuilder.andWhere('tela.denominacion LIKE :denominacion', { denominacion: `%${filterTelaDto.denominacion}%` });
    }

    if (filterTelaDto.ids_aplicaciones) {
      queryBuilder.andWhere('aplicaciones_tela.id_aplicaciones IN (:...ids_aplicaciones)', { ids_aplicaciones: filterTelaDto.ids_aplicaciones });
    }

    if (filterTelaDto.ids_tipo_estructural) {
      queryBuilder.andWhere('tipo_estructurales.id_tipo_estructural IN (:...ids_tipo_estructural)', { ids_tipo_estructural: filterTelaDto.ids_tipo_estructural });
    }

    if (filterTelaDto.ids_composicion) {
      queryBuilder.andWhere('composiciones.id IN (:...ids_composicion)', { ids_composicion: filterTelaDto.ids_composicion });
    }

    if (filterTelaDto.ids_conservacion) {
      queryBuilder.andWhere('conservaciones.id IN (:...ids_conservacion)', { ids_conservacion: filterTelaDto.ids_conservacion });
    }

    if (filterTelaDto.ids_estructura_ligamento) {
      queryBuilder.andWhere('estructura_ligamentos.id IN (:...ids_estructura_ligamento)', { ids_estructura_ligamento: filterTelaDto.ids_estructura_ligamento });
    }

    if (filterTelaDto.cac_tecnicas && filterTelaDto.cac_tecnicas.length === 3) {
      const [resistencia, absorcion, elasticidad] = filterTelaDto.cac_tecnicas;
      queryBuilder.andWhere('caracteristicas_tecnicas.resistencia = :resistencia', { resistencia })
        .andWhere('caracteristicas_tecnicas.absorcion = :absorcion', { absorcion })
        .andWhere('caracteristicas_tecnicas.elasticidad = :elasticidad', { elasticidad });
    }

    if (filterTelaDto.cac_visuales && filterTelaDto.cac_visuales.length === 3) {
      const [transparencia, brillo, tacto] = filterTelaDto.cac_visuales;
      queryBuilder.andWhere('caracteristicas_visuales.transparencia = :transparencia', { transparencia })
        .andWhere('caracteristicas_visuales.brillo = :brillo', { brillo })
        .andWhere('caracteristicas_visuales.tacto = :tacto', { tacto });
    }

    return queryBuilder.getMany();
  }
}
