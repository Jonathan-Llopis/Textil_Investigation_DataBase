import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { Conservacion } from './conservacion.entity';
import { CreateConservacionDto, UpdateConservacionDto } from './conservacion.dto';

@Injectable()
export class ConservacionService {
  constructor(
    @InjectRepository(Conservacion)
    private readonly conservacionRepository: Repository<Conservacion>,
    private readonly utilsService: UtilsService,
  ) {}

  async getAllConservacion(format?: string): Promise<any> {
    const conservaciones = await this.conservacionRepository.find();

    if (format === 'xml') {
      const jsonForXml = JSON.stringify({ Conservaciones: conservaciones });
      return this.utilsService.convertJSONtoXML(jsonForXml);
    }

    return conservaciones;
  }

  async getConservacion(id: number, format?: string): Promise<any> {
    const conservacion = await this.conservacionRepository.findOne({
      where: { id: id },
    });

    if (!conservacion) {
      throw new HttpException('Conservación no encontrada', HttpStatus.NOT_FOUND);
    }

    if (format === 'xml') {
      const jsonForXml = JSON.stringify({ Conservacion: conservacion });
      return this.utilsService.convertJSONtoXML(jsonForXml);
    }

    return conservacion;
  }

  async createConservacion(
    createConservacionDto: CreateConservacionDto,
  ): Promise<{ message: string }> {
    const newConservacion = this.conservacionRepository.create(createConservacionDto);
    await this.conservacionRepository.save(newConservacion);
    return { message: 'Conservación creada satisfactoriamente' };
  }

  async updateConservacion(
    id: number,
    updateConservacionDto: UpdateConservacionDto,
  ): Promise<Conservacion> {
    const conservacion = await this.conservacionRepository.findOne({
      where: { id: id },
    });

    if (!conservacion) {
      throw new HttpException('Conservación no encontrada', HttpStatus.NOT_FOUND);
    }

    await this.conservacionRepository.update(id, updateConservacionDto);

    return this.conservacionRepository.findOne({
      where: { id: id },
    });
  }

  async deleteConservacion(id: number): Promise<{ message: string }> {
    const result = await this.conservacionRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Conservación no encontrada', HttpStatus.NOT_FOUND);
    }

    return { message: 'Conservación eliminada satisfactoriamente' };
  }
}
