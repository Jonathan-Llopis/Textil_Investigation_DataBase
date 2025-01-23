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
import { Cac_TecnicasService } from './cac_tecnicas.service';
import { CreateCacTecnicaDto, UpdateCacTecnicaDto } from './cac_tecnica.dto';

@Controller('cac_tecnicas')
export class Cac_TecnicasController {
  constructor(private readonly cacTecnicasService: Cac_TecnicasService) {}

  @Get()
  async getAllCacTecnicas(
    @Query('format') format?: string,
    @Res() res?: Response,
  ) {
    const data = await this.cacTecnicasService.getAllCacTecnicas(format);

    if (format === 'xml' && res) {
      res.set('Content-Type', 'application/xml');
      return res.send(data);
    }

    return res ? res.json(data) : data;
  }

  @Get(':id')
  async getCacTecnica(
    @Param('id') id: string,
    @Query('format') format?: string,
    @Res() res?: Response,
  ) {
    const data = await this.cacTecnicasService.getCacTecnica(
      parseInt(id),
      format,
    );

    if (format === 'xml' && res) {
      res.set('Content-Type', 'application/xml');
      return res.send(data);
    }

    return res ? res.json(data) : data;
  }

  @Post()
  async createCacTecnica(@Body() createCacTecnicaDto: CreateCacTecnicaDto) {
    return this.cacTecnicasService.createCacTecnica(createCacTecnicaDto);
  }

  @Put(':id')
  async updateCacTecnica(
    @Param('id') id: string,
    @Body() updateCacTecnicaDto: UpdateCacTecnicaDto,
  ) {
    return this.cacTecnicasService.updateCacTecnica(
      parseInt(id),
      updateCacTecnicaDto,
    );
  }

  @Delete(':id')
  async deleteCacTecnica(@Param('id') id: string) {
    return this.cacTecnicasService.deleteCacTecnica(parseInt(id));
  }
}
