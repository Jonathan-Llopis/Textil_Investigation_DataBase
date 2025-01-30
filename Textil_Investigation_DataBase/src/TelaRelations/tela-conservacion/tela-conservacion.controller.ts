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
import { TelaConservacionService } from './tela-conservacion.service';

@Controller('tela-conservacion')
export class TelaConservacionController {
  constructor(
    private readonly telaConservacionService: TelaConservacionService,
  ) {}

  @Post(':id_tela')
  async addConservacion(
    @Param('id_tela') idTela: number,
    @Body('ids_conservacion') idsConservacion: number[],
  ) {
    return this.telaConservacionService.addConservacionToTela(
      idTela,
      idsConservacion,
    );
  }

  @Put(':id_tela')
  async updateConservacion(
    @Param('id_tela') idTela: number,
    @Body('ids_conservacion') idsConservacion: number[],
  ) {
    return this.telaConservacionService.updateConservacionesFromTela(
      idTela,
      idsConservacion,
    );
  }

  @Delete(':id_tela')
  async removeAllConservaciones(@Param('id_tela') idTela: number) {
    return this.telaConservacionService.removeAllConservacionesFromTela(idTela);
  }

  @Delete(':id_tela/:id_conservacion')
  async removeConservacion(
    @Param('id_tela') idTela: number,
    @Param('id_conservacion') idConservacion: number,
  ) {
    return this.telaConservacionService.deleteConservacionFromTela(
      idTela,
      idConservacion,
    );
  }

  @Get('conservacion/:id_conservacion/telas')
  async findTelasByConservacionId(
    @Param('id_conservacion') idConservacion: string,
  ) {
    if (isEmpty(idConservacion)) {
      throw new HttpException(
        'Invalid conservación ID',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.telaConservacionService.findTelasByConservacion(
      parseInt(idConservacion),
    );
  }
}
