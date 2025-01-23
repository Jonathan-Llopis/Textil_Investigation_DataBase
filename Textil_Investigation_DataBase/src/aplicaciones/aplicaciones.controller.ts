import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AplicacionesService } from './aplicaciones.service';
import { CreateAplicacionDto, UpdateAplicacionDto } from './aplicaciones.dto';

@Controller('aplicaciones')
export class AplicacionesController {
  constructor(private readonly aplicacionesService: AplicacionesService) {}

  // Crear una nueva aplicación
  @Post()
  async createAplicacion(@Body() createAplicacionDto: CreateAplicacionDto) {
    return this.aplicacionesService.create(createAplicacionDto);
  }

  // Obtener todas las aplicaciones
  @Get()
  async getAllAplicaciones() {
    return this.aplicacionesService.findAll();
  }

  @Get(':id')
  async getAplicacion(@Param('id') id: number) {
    return this.aplicacionesService.findOne(id);
  }

  // Actualizar una aplicación por ID
  @Put(':id')
  async updateAplicacion(
    @Param('id') id: number,
    @Body() updateAplicacionDto: UpdateAplicacionDto,
  ) {
    return this.aplicacionesService.update(id, updateAplicacionDto);
  }

  // Eliminar una aplicación por ID
  @Delete(':id')
  async deleteAplicacion(@Param('id') id: number) {
    return this.aplicacionesService.remove(id);
  }
}
