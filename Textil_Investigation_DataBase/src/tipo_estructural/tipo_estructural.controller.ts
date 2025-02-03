import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  CreateTipoEstructuralDto,
  UpdateTipoEstructuralDto,
} from './tipo_estructural.dto';
import { TipoEstructuralService } from './tipo_estructural.service';

@Controller('tipos_estructurales')
export class TipoEstructuralController {
  constructor(
    private readonly tipoEstructuralService: TipoEstructuralService,
  ) {}

  @Post()
  async createTipoEstructural(
    @Body() createTipoEstructuralDto: CreateTipoEstructuralDto,
  ) {
    return this.tipoEstructuralService.create(createTipoEstructuralDto);
  }

  @Get()
  async getAllTipoEstructurales() {
    return this.tipoEstructuralService.findAll();
  }

  // Obtener un tipo estructural por ID
  @Get(':id')
  async getTipoEstructural(@Param('id') id: number) {
    return this.tipoEstructuralService.findOne(id);
  }

  // Actualizar un tipo estructural por ID
  @Put(':id')
  async updateTipoEstructural(
    @Param('id') id: number,
    @Body() updateTipoEstructuralDto: UpdateTipoEstructuralDto,
  ) {
    return this.tipoEstructuralService.update(id, updateTipoEstructuralDto);
  }

  // Eliminar un tipo estructural por ID
  @Delete(':id')
  async deleteTipoEstructural(@Param('id') id: number) {
    return this.tipoEstructuralService.remove(id);
  }
}
