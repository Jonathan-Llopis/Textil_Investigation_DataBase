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
import { TelaEstructuraLigamentoService } from './tela-estructura_ligamento.service';
  
  @Controller('tela-estructura-ligamento')
  export class TelaEstructuraLigamentoController {
    constructor(
      private readonly telaEstructuraLigamentoService: TelaEstructuraLigamentoService,
    ) {}
  
    @Post(':id_tela')
    async addEstructuraLigamento(
      @Param('id_tela') idTela: number,
      @Body('ids_estructura_ligamento') idsEstructuraLigamento: number[],
    ) {
      return this.telaEstructuraLigamentoService.addEstructuraLigamentoToTela(
        idTela,
        idsEstructuraLigamento,
      );
    }
  
    @Put(':id_tela')
    async updateEstructuraLigamento(
      @Param('id_tela') idTela: number,
      @Body('ids_estructura_ligamento') idsEstructuraLigamento: number[],
    ) {
      return this.telaEstructuraLigamentoService.updateEstructurasLigamentoFromTela(
        idTela,
        idsEstructuraLigamento,
      );
    }
  
    @Delete(':id_tela')
    async removeAllEstructurasLigamento(@Param('id_tela') idTela: number) {
      return this.telaEstructuraLigamentoService.removeAllEstructurasLigamentoFromTela(
        idTela,
      );
    }
  
    @Delete(':id_tela/:id_estructura_ligamento')
    async removeEstructuraLigamento(
      @Param('id_tela') idTela: number,
      @Param('id_estructura_ligamento') idEstructuraLigamento: number,
    ) {
      return this.telaEstructuraLigamentoService.deleteEstructuraLigamentoFromTela(
        idTela,
        idEstructuraLigamento,
      );
    }
  
    @Get('estructura/:id_estructura_ligamento/telas')
    async findTelasByEstructuraLigamentoId(
      @Param('id_estructura_ligamento') idEstructuraLigamento: string,
    ) {
      if (isEmpty(idEstructuraLigamento)) {
        throw new HttpException(
          'Invalid estructura ligamento ID',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.telaEstructuraLigamentoService.findTelasByEstructuraLigamento(
        parseInt(idEstructuraLigamento),
      );
    }
  }
  