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
    const tela = await this.telaRepository.findOneBy({ id_tela: id });
    if (!tela) {
      throw new NotFoundException('Tela no encontrada');
    }
    tela.id_img = updateTelaDto.id_img;
    return this.telaRepository.save(tela);
  }

  async updateImg(id: number, idImagen: string): Promise<TelaEntity> {
    const tela = await this.telaRepository.findOneBy({ id_tela: id });
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
    const telas = await this.telaRepository.find({
      relations: [
        'aplicaciones_tela',
        'tipo_estructurales',
        'composiciones',
        'conservaciones',
        'estructura_ligamentos',
        'caracteristicas_tecnicas',
        'caracteristicas_visuales',
      ],
    });

    return telas.filter(tela => {
      if (filterTelaDto.denominacion && !tela.denominacion.includes(filterTelaDto.denominacion)) {
        return false;
      }

      if (filterTelaDto.ids_aplicaciones && !filterTelaDto.ids_aplicaciones.every(id => tela.aplicaciones_tela.some(aplicacion => aplicacion.id_aplicaciones === id))) {
        return false;
      }

      if (filterTelaDto.ids_tipo_estructural && !filterTelaDto.ids_tipo_estructural.every(id => tela.tipo_estructurales.some(tipo => tipo.id_tipo_estructural === id))) {
        return false;
      }

      if (filterTelaDto.ids_composicion && !filterTelaDto.ids_composicion.every(id => tela.composiciones.some(composicion => composicion.id === id))) {
        return false;
      }

      if (filterTelaDto.ids_conservacion && !filterTelaDto.ids_conservacion.every(id => tela.conservaciones.some(conservacion => conservacion.id === id))) {
        return false;
      }

      if (filterTelaDto.ids_estructura_ligamento && !filterTelaDto.ids_estructura_ligamento.every(id => tela.estructura_ligamentos.some(estructura => estructura.id === id))) {
        return false;
      }
      if (filterTelaDto.cac_tecnicas && filterTelaDto.cac_tecnicas.length === 3) {
        const [resistencia, absorcion, elasticidad] = filterTelaDto.cac_tecnicas;
        if (
          !tela.caracteristicas_tecnicas.some(
        tecnica =>
          tecnica.resistencia === resistencia &&
          tecnica.absorcion === absorcion &&
          tecnica.elasticidad === elasticidad,
          )
        ) {
          return false;
        }
      }

      if (filterTelaDto.cac_visuales && filterTelaDto.cac_visuales.length === 3) {
        const [transparencia, brillo, tacto] = filterTelaDto.cac_visuales;
        if (
          !tela.caracteristicas_visuales.some(
        visual =>
          visual.transparencia === transparencia &&
          visual.brillo === brillo &&
          visual.tacto === tacto,
          )
        ) {
          return false;
        }
      }

      return true;
    });
  }
}
