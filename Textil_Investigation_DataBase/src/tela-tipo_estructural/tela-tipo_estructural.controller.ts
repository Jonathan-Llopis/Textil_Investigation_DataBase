import { Controller, Post, Put, Delete, Param, Body } from '@nestjs/common';
import {
  CreateTelaTipoEstructuralDto,
  UpdateTelaTipoEstructuralDto,
} from './tela-tipo_estructural.dto';
import { TelaTipoEstructuralService } from './tela-tipo_estructural.service';

@Controller('tela-tipo-estructural')
export class TelaTipoEstructuralController {
  constructor(
    private readonly telaTipoEstructuralService: TelaTipoEstructuralService,
  ) {}

  // Agregar una nueva relación entre Tela y TipoEstructural
  @Post()
  async addTipoEstructural(
    @Body() createTelaTipoEstructuralDto: CreateTelaTipoEstructuralDto,
  ) {
    return this.telaTipoEstructuralService.add(createTelaTipoEstructuralDto);
  }

  // Actualizar la relación de TipoEstructural de una Tela
  @Put(':id_tela')
  async updateTipoEstructural(
    @Param('id_tela') idTela: number,
    @Body() updateTelaTipoEstructuralDto: UpdateTelaTipoEstructuralDto,
  ) {
    return this.telaTipoEstructuralService.update(
      idTela,
      updateTelaTipoEstructuralDto,
    );
  }

  // Eliminar todos los TipoEstructural de una Tela
  @Delete(':id_tela')
  async removeAllTipoEstructural(@Param('id_tela') idTela: number) {
    return this.telaTipoEstructuralService.removeAll(idTela);
  }

  // Eliminar un TipoEstructural específico de una Tela
  @Delete(':id_tela/:id_tipo_estructural')
  async removeTipoEstructural(
    @Param('id_tela') idTela: number,
    @Param('id_tipo_estructural') idTipoEstructural: number,
  ) {
    return this.telaTipoEstructuralService.remove(idTela, idTipoEstructural);
  }
}
