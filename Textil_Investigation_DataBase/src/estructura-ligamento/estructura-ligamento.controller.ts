import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstructuraService } from './estructura-ligamento.service';
import { CreateEstructuraDto } from './estructura-ligamento.dto';
import { UpdateEstructuraDto } from './dtos/update-estructura.dto';

@Controller('estructura')
export class EstructuraController {
  constructor(private readonly estructuraService: EstructuraService) {}

  @Post()
  create(@Body() createEstructuraDto: CreateEstructuraDto) {
    return this.estructuraService.create(createEstructuraDto);
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
    @Body() updateEstructuraDto: UpdateEstructuraDto,
  ) {
    return this.estructuraService.update(+id, updateEstructuraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estructuraService.remove(+id);
  }
}
