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
import { ConservacionService } from './conservacion.service';
import {
  CreateConservacionDto,
  UpdateConservacionDto,
} from './conservacion.dto';

@Controller('conservaciones')
export class ConservacionController {
  constructor(private readonly conservacionService: ConservacionService) {}

  @Get()
  async getAllConservacion(
    @Query('format') format?: string,
    @Res() res?: Response,
  ) {
    const data = await this.conservacionService.getAllConservacion(format);

    if (format === 'xml' && res) {
      res.set('Content-Type', 'application/xml');
      return res.send(data);
    }

    return res ? res.json(data) : data;
  }

  @Get(':id')
  async getConservacion(
    @Param('id') id: string,
    @Query('format') format?: string,
    @Res() res?: Response,
  ) {
    const data = await this.conservacionService.getConservacion(
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
  async createConservacion(
    @Body() createConservacionDto: CreateConservacionDto,
  ) {
    return this.conservacionService.createConservacion(createConservacionDto);
  }

  @Put(':id')
  async updateConservacion(
    @Param('id') id: string,
    @Body() updateConservacionDto: UpdateConservacionDto,
  ) {
    return this.conservacionService.updateConservacion(
      parseInt(id),
      updateConservacionDto,
    );
  }

  @Delete(':id')
  async deleteConservacion(@Param('id') id: string) {
    return this.conservacionService.deleteConservacion(parseInt(id));
  }
}
