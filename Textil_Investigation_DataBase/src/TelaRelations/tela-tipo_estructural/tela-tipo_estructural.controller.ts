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
  @Put(':id_tela')
  async updateTipoEstructural(
    @Param('id_tela') idTela: number,
    @Body() updateTelaTipoEstructuralDto: UpdateTelaDto,
  ) {
    return this.telaTipoEstructuralService.updateTipoEstructuralesFromTela(
      idTela,
      updateTelaTipoEstructuralDto.ids_tipo_estructural,
    );
  }
  @Delete(':id_tela')
  async removeAllTipoEstructural(@Param('id_tela') idTela: number) {
    return this.telaTipoEstructuralService.removeAllTipoEstructuralesFromTela(
      idTela,
    );
  }

  @Delete(':id_tela/:id_tipo_estructural')
  async removeTipoEstructural(
    @Param('id_tela') idTela: number,
    @Param('id_tipo_estructural') idTipoEstructural: number,
  ) {
    return this.telaTipoEstructuralService.deleteTipoEstructuralFromTela(
      idTela,
      idTipoEstructural,
    );
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
    return this.telaTipoEstructuralService.findTelaFromTipoEstructural(
      parseInt(tipoEstructuralId),
    );
  }
}
