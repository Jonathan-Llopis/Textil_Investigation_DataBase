import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { EstructuraLigamentosService } from './estructura-ligamento.service';
import {
  CreateEstructuraLigamentosDto,
  UpdateEstructuraLigamentosDto,
} from './estructura-ligamento.dto';

@Controller('estructuras_ligamentos')
export class EstructuraLigamentosController {
  constructor(
    private readonly estructuraService: EstructuraLigamentosService,
  ) {}

  @Get()
  async getAllEstructuras(
    @Query('format') format?: string,
    @Res() res?: Response,
  ) {
    const data = await this.estructuraService.findAll();

    if (format === 'xml' && res) {
      res.set('Content-Type', 'application/xml');
      return res.send(data);
    }

    return res ? res.json(data) : data;
  }

  @Get(':id')
  async getEstructura(
    @Param('id') id: string,
    @Query('format') format?: string,
    @Res() res?: Response,
  ) {
    const data = await this.estructuraService.findOne(+id);

    if (format === 'xml' && res) {
      res.set('Content-Type', 'application/xml');
      return res.send(data);
    }

    return res ? res.json(data) : data;
  }

  @Post()
  async createEstructura(
    @Body() createEstructuraLigamentosDto: CreateEstructuraLigamentosDto,
  ) {
    return this.estructuraService.create(createEstructuraLigamentosDto);
  }

  @Put(':id')
  async updateEstructura(
    @Param('id') id: string,
    @Body() updateEstructuraLigamentosDto: UpdateEstructuraLigamentosDto,
  ) {
    return this.estructuraService.update(+id, updateEstructuraLigamentosDto);
  }

  @Delete(':id')
  async deleteEstructura(@Param('id') id: string) {
    return this.estructuraService.remove(+id);
  }
}
