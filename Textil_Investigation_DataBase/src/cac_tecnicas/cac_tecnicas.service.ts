import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from '../utils/utils.service';
import { Cac_TecnicasEntity } from './cac_tecnicas.entity';
import { Repository } from 'typeorm';
import { CreateCacTecnicaDto, UpdateCacTecnicaDto } from './cac_tecnica.dto';

@Injectable()
export class Cac_TecnicasService {
  constructor(
    @InjectRepository(Cac_TecnicasEntity)
    private readonly cacTecnicasRepository: Repository<Cac_TecnicasEntity>,
    private readonly utilsService: UtilsService,
  ) {}

  async getAllCacTecnicas(format?: string): Promise<any> {
    const cacTecnicas = await this.cacTecnicasRepository.find();

    if (format === 'xml') {
      const jsonForXml = JSON.stringify({ Cac_Tecnicas: cacTecnicas });
      return this.utilsService.convertJSONtoXML(jsonForXml);
    }

    return cacTecnicas;
  }

  async getCacTecnica(id: number, format?: string): Promise<any> {
    const cacTecnica = await this.cacTecnicasRepository.findOne({
      where: { id: id },
    });

    if (!cacTecnica) {
      throw new HttpException('Técnica no encontrada', HttpStatus.NOT_FOUND);
    }

    if (format === 'xml') {
      const jsonForXml = JSON.stringify({ Cac_Tecnica: cacTecnica });
      return this.utilsService.convertJSONtoXML(jsonForXml);
    }

    return cacTecnica;
  }

  async createCacTecnica(
    createCacTecnicaDto: CreateCacTecnicaDto,
  ): Promise<{ message: string }> {
    const newCacTecnica =
      this.cacTecnicasRepository.create(createCacTecnicaDto);
    await this.cacTecnicasRepository.save(newCacTecnica);
    return { message: 'Técnica creada satisfactoriamente' };
  }

  async updateCacTecnica(
    id: number,
    updateCacTecnicaDto: UpdateCacTecnicaDto,
  ): Promise<Cac_TecnicasEntity> {
    const cacTecnica = await this.cacTecnicasRepository.findOne({
      where: { id: id },
    });

    if (!cacTecnica) {
      throw new HttpException('Técnica no encontrada', HttpStatus.NOT_FOUND);
    }

    await this.cacTecnicasRepository.update(id, updateCacTecnicaDto);

    return this.cacTecnicasRepository.findOne({
      where: { id: id },
    });
  }

  async deleteCacTecnica(id: number): Promise<{ message: string }> {
    const result = await this.cacTecnicasRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Técnica no encontrada', HttpStatus.NOT_FOUND);
    }

    return { message: 'Técnica eliminada satisfactoriamente' };
  }
}
