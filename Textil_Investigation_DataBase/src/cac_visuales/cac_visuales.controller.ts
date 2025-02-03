import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CacVisualesService } from './cac_visuales.service';
import { CreateCacVisualDto, UpdateCacVisualDto } from './cac_visuales.dto';

@Controller('cac_visuales')
export class CacVisualesController {
  constructor(private readonly cacVisualesService: CacVisualesService) {}

  @Post()
  create(@Body() createCacVisualDto: CreateCacVisualDto) {
    return this.cacVisualesService.create(createCacVisualDto);
  }

  @Get()
  findAll() {
    return this.cacVisualesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cacVisualesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCacVisualDto: UpdateCacVisualDto,
  ) {
    return this.cacVisualesService.update(+id, updateCacVisualDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cacVisualesService.remove(+id);
  }
}
