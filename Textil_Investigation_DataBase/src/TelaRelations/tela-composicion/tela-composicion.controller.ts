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
import { TelaComposicionService } from './tela-composicion.service';
import { isEmpty } from 'class-validator';

@Controller('tela-composicion')
export class TelaComposicionController {
  constructor(
    private readonly telaComposicionService: TelaComposicionService,
  ) {}

  @Post(':id_tela')
  async addComposicion(
    @Param('id_tela') idTela: number,
    @Body('ids_composicion') idsComposicion: number[],
  ) {
    return this.telaComposicionService.addComposicionToTela(
      idTela,
      idsComposicion,
    );
  }

  @Put(':id_tela')
  async updateComposicion(
    @Param('id_tela') idTela: number,
    @Body('ids_composicion') idsComposicion: number[],
  ) {
    return this.telaComposicionService.updateComposicionesFromTela(
      idTela,
      idsComposicion,
    );
  }

  @Delete(':id_tela')
  async removeAllComposiciones(@Param('id_tela') idTela: number) {
    return this.telaComposicionService.removeAllComposicionesFromTela(idTela);
  }

  @Delete(':id_tela/:id_composicion')
  async removeComposicion(
    @Param('id_tela') idTela: number,
    @Param('id_composicion') idComposicion: number,
  ) {
    return this.telaComposicionService.deleteComposicionFromTela(
      idTela,
      idComposicion,
    );
  }

  @Get('composicion/:id_composicion/telas')
  async findTelasByComposicionId(
    @Param('id_composicion') idComposicion: string,
  ) {
    if (isEmpty(idComposicion)) {
      throw new HttpException('Invalid composición ID', HttpStatus.BAD_REQUEST);
    }
    return this.telaComposicionService.findTelasByComposicion(
      parseInt(idComposicion),
    );
  }
}
