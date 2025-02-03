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
import { CreateTelaDto, UpdateTelaDto } from '../../tela/tela.dto';
import { TelaTipoCac_VisualesService } from './tela-cac_Visuales.service';

@Controller('tela-cac-visuales')
export class TelaTipoCac_VisualesController {
  constructor(
    private readonly telaTipoCac_VisualesService: TelaTipoCac_VisualesService,
  ) {}

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

  @Delete(':id_tela')
  async removeAllCacVisuales(@Param('id_tela') idTela: number) {
    return this.telaTipoCac_VisualesService.removeAllCacVisuales(idTela);
  }

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
  async findTelasByCacTecnicasId(
    @Param('cacVisualesId') cacVisualesId: string,
  ) {
    if (isEmpty(cacVisualesId)) {
      throw new HttpException(
        'Invalid cac tecnicas ID',
        HttpStatus.BAD_REQUEST,
      );
    }
    const ids = cacVisualesId.split('-').map((id) => parseInt(id));
    if (ids.length !== 3) {
      throw new HttpException(
        'Exactly three IDs must be provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    const [id1, id2, id3] = ids;
    return this.telaTipoCac_VisualesService.findTelasByCacVisuales(
      id1,
      id2,
      id3,
    );
  }
}
