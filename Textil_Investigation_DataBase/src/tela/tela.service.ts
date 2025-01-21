import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tela } from './tela.entity';
import { CreateTelaDto } from './tela.dto';
import { UpdateTelaDto } from './tela.dto';

@Injectable()
export class TelaService {
  constructor(
    @InjectRepository(Tela)
    private readonly telaRepository: Repository<Tela>,
  ) {}

  // Crear una nueva tela
  async create(createTelaDto: CreateTelaDto): Promise<Tela> {
    const tela = this.telaRepository.create(createTelaDto);
    return this.telaRepository.save(tela);
  }

  // Obtener todas las telas
  async findAll(): Promise<Tela[]> {
    return this.telaRepository.find();
  }

  // Actualizar una tela por ID
  async update(id: number, updateTelaDto: UpdateTelaDto): Promise<Tela> {
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
}
