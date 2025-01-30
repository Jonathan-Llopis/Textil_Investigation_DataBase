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
import { isEmpty } from 'class-validator';
import { CreateTelaDto, UpdateTelaDto } from '../tela/tela.dto';
import { TelaTipoCac_VisualesService } from './tela-cac_visuales.service';

@Controller('tela-cac-visuales')
export class TelaTipoCac_VisualesController {
  constructor(
    private readonly telaTipoCac_VisualesService: TelaTipoCac_VisualesService,
  ) {}

  // Agregar una nueva relación entre Tela y Cac_Visuales
  @Post(':id')
  async addCacVisuales(
    @Param('id') idTela: number,
    @Body() createTelaCacVisualesDto: CreateTelaDto,
  ) {
    return this.telaTipoCac_VisualesService.addTelaToCacVisuales(
      createTelaCacVisualesDto,
      idTela,
    );
  }

  // Actualizar la relación de Cac_Visuales de una Tela
  @Put(':id_tela')
  async updateCacVisuales(
    @Param('id_tela') idTela: number,
    @Body() updateTelaCacVisualesDto: UpdateTelaDto,
  ) {
    return this.telaTipoCac_VisualesService.updateCacVisualesFromTela(
      idTela,
      updateTelaCacVisualesDto.ids_cac_visuales,

    );
  }

  // Eliminar todos los Cac_Visuales de una Tela
  @Delete(':id_tela')
  async removeAllCacVisuales(@Param('id_tela') idTela: number) {
    return this.telaTipoCac_VisualesService.removeAllCacVisuales(idTela);
  }

  // Eliminar un Cac_Visual específico de una Tela
  @Delete(':id_tela/:id_cac_visual')
  async removeCacVisuales(
    @Param('id_tela') idTela: number,
    @Param('id_cac_visual') idCacVisual: number,
  ) {
    return this.telaTipoCac_VisualesService.deleteCacVisualFromTela(
      idTela,
      idCacVisual,
    );
  }

  @Get('cacvisuales/:cacVisualId/telas')
  async findTelasByCacVisualId(@Param('cacVisualId') cacVisualId: string) {
    if (isEmpty(cacVisualId)) {
      throw new HttpException(
        'Invalid Cac Visual ID',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.telaTipoCac_VisualesService.findTelasByCacVisuales(
      parseInt(cacVisualId),
    );
  }
}
