import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TelaService } from './tela.service';
import { CreateTelaDto } from './tela.dto';
import { UpdateTelaDto } from './tela.dto';

@Controller('telas')
export class TelaController {
  constructor(private readonly telaService: TelaService) {}

  // Crear una nueva tela
  @Post()
  async createTela(@Body() createTelaDto: CreateTelaDto) {
    return this.telaService.create(createTelaDto);
  }

  // Obtener todas las telas
  @Get()
  async getAllTelas() {
    return this.telaService.findAll();
  }

  // Obtener una sola tela por ID
  @Get(':id')
  async getTelaById(@Param('id') id: number) {
    return this.telaService.findOne(id);
  }
  // Actualizar una tela por ID
  @Put(':id')
  async updateTela(
    @Param('id') id: number,
    @Body() updateTelaDto: UpdateTelaDto,
  ) {
    return this.telaService.update(id, updateTelaDto);
  }

  // Eliminar una tela por ID
  @Delete(':id')
  async deleteTela(@Param('id') id: number) {
    return this.telaService.remove(id);
  }
}
