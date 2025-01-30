import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { CreateTelaDto, UpdateTelaDto } from 'src/tela/tela.dto';
import { TelaCacTecnicasService } from './tela-cac_tecnicas.service';
import { isEmpty } from 'class-validator/types/decorator/common/IsEmpty';

@Controller('tela-cac_tecnicas')
export class TelaCacTecnicasController {
  constructor(
    private readonly telaCacTecnicasService: TelaCacTecnicasService,
  ) {}

  @Get('cac_tecnicas/:cacTecnicasId/telas')
  async findTelasByCacTecnicasId(
    @Param('cacTecnicasId') cacTecnicasId: string,
  ) {
    if (isEmpty(cacTecnicasId)) {
      throw new HttpException(
        'Invalid cac tecnicas ID',
        HttpStatus.BAD_REQUEST,
      );
    }
    const ids = cacTecnicasId.split('-').map((id) => parseInt(id));
    if (ids.length !== 3) {
      throw new HttpException(
        'Exactly three IDs must be provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    const [id1, id2, id3] = ids;
    return this.telaCacTecnicasService.findTelaFromCacTecnicas(id1, id2, id3);
  }

  @Post(':id')
  async addCacTecnicas(
    @Param('id') idTela: number,
    @Body() createTelaCacTecnicasDto: CreateTelaDto,
  ) {
    return this.telaCacTecnicasService.addTelaToCacTecnicas(
      createTelaCacTecnicasDto,
      idTela,
    );
  }

  @Put(':id_tela')
  async updateCacTecnicas(
    @Param('id_tela') idTela: number,
    @Body() updateTelaCacTecnicasDto: UpdateTelaDto,
  ) {
    return this.telaCacTecnicasService.updateCacTecnicasFromTela(
      idTela,
      updateTelaCacTecnicasDto.ids_cac_tecnica,
    );
  }

  @Delete(':id_tela')
  async removeAllCacTecnicas(@Param('id_tela') idTela: number) {
    return this.telaCacTecnicasService.removeAllCacTecnicasFromTela(idTela);
  }

  @Delete(':id_tela/:id_cac_tecnicas')
  async removeCacTecnicas(
    @Param('id_tela') idTela: number,
    @Param('id_cac_tecnicas') idCacTecnicas: number,
  ) {
    return this.telaCacTecnicasService.removeCacTecnicasFromTela(
      idTela,
      idCacTecnicas,
    );
  }
}
