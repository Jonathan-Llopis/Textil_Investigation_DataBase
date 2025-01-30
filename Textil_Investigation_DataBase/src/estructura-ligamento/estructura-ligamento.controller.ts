import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstructuraLigamentosService } from './estructura-ligamento.service';
import {
  CreateEstructuraLigamentosDto,
  UpdateEstructuraLigamentosDto,
} from './estructura-ligamento.dto';

@Controller('estructura')
export class EstructuraLigamentosController {
  constructor(private readonly estructuraService: EstructuraLigamentosService) {}

  @Post()
  create(@Body() createEstructuraLigamentosDto: CreateEstructuraLigamentosDto) {
    return this.estructuraService.create(createEstructuraLigamentosDto);
  }

  @Get()
  findAll() {
    return this.estructuraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estructuraService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstructuraLigamentosDto: UpdateEstructuraLigamentosDto,
  ) {
    return this.estructuraService.update(+id, updateEstructuraLigamentosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estructuraService.remove(+id);
  }
}
