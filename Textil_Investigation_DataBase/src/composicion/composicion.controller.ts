import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComposicionService } from './composicion.service';
import { CreateComposicionDto } from './composicion.dto';
import { UpdateComposicionDto } from './dtos/update.dto';

@Controller('composicion')
export class ComposicionController {
  constructor(private readonly composicionService: ComposicionService) {}

  @Post()
  create(@Body() createComposicionDto: CreateComposicionDto) {
    return this.composicionService.create(createComposicionDto);
  }

  @Get()
  findAll() {
    return this.composicionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.composicionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComposicionDto: UpdateComposicionDto,
  ) {
    return this.composicionService.update(+id, updateComposicionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.composicionService.remove(+id);
  }
}
