import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TelaTipoEstructuralService } from './tela-tipo_estructural.service';
import { isEmpty } from 'class-validator';
import { CreateTelaDto, UpdateTelaDto } from 'src/tela/tela.dto';

@Controller('tela-tipo-estructural')
export class TelaTipoEstructuralController {
  constructor(
    private readonly telaTipoEstructuralService: TelaTipoEstructuralService,
  ) {}

  // Agregar una nueva relación entre Tela y TipoEstructural
  @Post(':id')
  async addTipoEstructural(
    @Param('id') idTela: number,
    @Body() createTelaTipoEstructuralDto: CreateTelaDto,
  ) {
    return this.telaTipoEstructuralService.addTelaToTipoEstructural(
      createTelaTipoEstructuralDto,
      idTela,
    );
  }

  // Actualizar la relación de TipoEstructural de una Tela
  @Put(':id_tela')
  async updateTipoEstructural(
    @Param('id_tela') idTela: number,
    @Body() updateTelaTipoEstructuralDto: UpdateTelaDto,
  ) {
    return this.telaTipoEstructuralService.updateTipoEstructural(
      idTela,
      updateTelaTipoEstructuralDto,
    );
  }

  // Eliminar todos los TipoEstructural de una Tela
  @Delete(':id_tela')
  async removeAllTipoEstructural(@Param('id_tela') idTela: number) {
    return this.telaTipoEstructuralService.removeAllTipoEstructural(idTela);
  }

  // Eliminar un TipoEstructural específico de una Tela
  @Delete(':id_tela/:id_tipo_estructural')
  async removeTipoEstructural(
    @Param('id_tela') idTela: number,
    @Param('id_tipo_estructural') idTipoEstructural: number,
  ) {
    return this.telaTipoEstructuralService.removeAllTipoEstructural(idTela);
  }

  @Get('tipoestructural/:tipoEstructuralId/telas')
  async findTelasByTipoEstructuralId(
    @Param('tipoEstructuralId') tipoEstructuralId: string,
  ) {
    if (isEmpty(tipoEstructuralId)) {
      throw new HttpException(
        'Invalid tipo estructural ID',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.telaTipoEstructuralService.findTelasByTipoEstructuralId(
      parseInt(tipoEstructuralId),
    );
  }
}
