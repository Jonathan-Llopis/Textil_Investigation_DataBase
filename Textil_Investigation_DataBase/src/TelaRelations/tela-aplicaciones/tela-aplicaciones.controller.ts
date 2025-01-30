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
  import { TelaAplicacionesService } from './tela-aplicaciones.service';
  import { isEmpty } from 'class-validator';
  
  @Controller('tela-aplicaciones')
  export class TelaAplicacionesController {
    constructor(
      private readonly telaAplicacionesService: TelaAplicacionesService,
    ) {}
  
    @Post(':id_tela')
    async addAplicacion(
      @Param('id_tela') idTela: number,
      @Body('ids_aplicaciones') idsAplicaciones: number[],
    ) {
      return this.telaAplicacionesService.addAplicacionesToTela(
        idTela,
        idsAplicaciones,
      );
    }
  
    @Put(':id_tela')
    async updateAplicacion(
      @Param('id_tela') idTela: number,
      @Body('ids_aplicaciones') idsAplicaciones: number[],
    ) {
      return this.telaAplicacionesService.updateAplicacionesFromTela(
        idTela,
        idsAplicaciones,
      );
    }
  
    @Delete(':id_tela')
    async removeAllAplicaciones(@Param('id_tela') idTela: number) {
      return this.telaAplicacionesService.removeAllAplicacionesFromTela(idTela);
    }
  
    @Delete(':id_tela/:id_aplicaciones')
    async removeAplicacion(
      @Param('id_tela') idTela: number,
      @Param('id_aplicaciones') idAplicaciones: number,
    ) {
      return this.telaAplicacionesService.deleteAplicacionFromTela(
        idTela,
        idAplicaciones,
      );
    }
  
    @Get('aplicacion/:id_aplicaciones/telas')
    async findTelasByAplicacionId(
      @Param('id_aplicaciones') idAplicaciones: string,
    ) {
      if (isEmpty(idAplicaciones)) {
        throw new HttpException(
          'Invalid aplicación ID',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.telaAplicacionesService.findTelasByAplicacion(
        parseInt(idAplicaciones),
      );
    }
  }
  