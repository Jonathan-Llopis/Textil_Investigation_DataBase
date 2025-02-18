import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Logger,
  HttpException,
  HttpStatus,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TelaService } from './tela.service';
import { CreateTelaDto, FilterTelaDto } from './tela.dto';
import { UpdateTelaDto } from './tela.dto';
import { debug } from 'console';
import { AplicacionesService } from 'src/aplicaciones/aplicaciones.service';
import { ConservacionService } from 'src/conservacion/conservacion.service';
import { EstructuraLigamentosService } from 'src/estructura-ligamento/estructura-ligamento.service';
import { TipoEstructuralService } from 'src/tipo_estructural/tipo_estructural.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Cac_TecnicasService } from 'src/cac_tecnicas/cac_tecnicas.service';
import { CacVisualesService } from 'src/cac_visuales/cac_visuales.service';
import { ComposicionService } from 'src/composicion/composicion.service';
import * as XLSX from 'xlsx';

@Controller('telas')
export class TelaController {
  constructor(private readonly telaService: TelaService,     private readonly composicionService: ComposicionService,
      private readonly aplicacionesService: AplicacionesService,
      private readonly conservacionService: ConservacionService,
      private readonly tipoEstructuralService: TipoEstructuralService,
      private readonly estructuraLigamentosService: EstructuraLigamentosService,
      private readonly cacTecnicas: Cac_TecnicasService,
      private readonly cacVisuales: CacVisualesService,) {}
  

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
  @Get('/:id')
  async getTelaById(@Param('id') id: number) {
    return this.telaService.findOne(id);
  }

  // Actualizar una tela por ID
  @Put('/:id')
  async updateTela(
    @Param('id') id: number,
    @Body() updateTelaDto: UpdateTelaDto,
  ) {
    return this.telaService.update(id, updateTelaDto);
  }

  // Eliminar una tela por ID
  @Delete('/:id')
  async deleteTela(@Param('id') id: number) {
    return this.telaService.remove(id);
  }

  @Post('/filter/telas')
  async filterTelas(@Body() filterTelaDto: FilterTelaDto) {
    return this.telaService.filterTelas(filterTelaDto);
  }

  @Post('create-entity/:type')
  @UseInterceptors(FilesInterceptor('file'))
  async createEntity(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('type') type: string,
  ) {
    if (!files || files.length === 0) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const file = files[0];
    const fileBuffer = file.buffer || Buffer.from(file.buffer);
    if (!fileBuffer) {
      throw new HttpException('File buffer is undefined', HttpStatus.BAD_REQUEST);
    }
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);

    let entities: any[];
    switch (type) {
      case '1':
        entities = jsonData.map(row => ({
          aplicacion: row['NOMBRE'],
        }));
        for (const entity of entities) {
          const existing = await this.aplicacionesService.findByName(entity.aplicacion);
          if (existing) {
            throw new HttpException(`Aplicacion already exists: ${entity.aplicacion}`, HttpStatus.CONFLICT);
          }
          await this.aplicacionesService.create({
            tipo_aplicacion: entity.aplicacion,
          });
        }
        break;
      case '2':
        entities = jsonData.map(row => ({
          composicion: row['NOMBRE'],
        }));
        for (const entity of entities) {
          const existing = await this.composicionService.findByName(entity.composicion);
          if (existing) {
            throw new HttpException(`Composicion already exists: ${entity.composicion}`, HttpStatus.CONFLICT);
          }
          await this.composicionService.create({
            descripcion: entity.composicion,
          });
        }
        break;
      case '3':
        entities = jsonData.map(row => ({
          conservacion: row['NOMBRE'],
        }));
        for (const entity of entities) {
          const existing = await this.conservacionService.findByName(entity.conservacion);
          if (existing) {
            throw new HttpException(`Conservacion already exists: ${entity.conservacion}`, HttpStatus.CONFLICT);
          }
          await this.conservacionService.createConservacion({
            description: entity.conservacion
          });
        }
        break;
      case '4':
        entities = jsonData.map(row => ({
          estructura_ligamento: row['NOMBRE'],
        }));
        for (const entity of entities) {
          const existing = await this.estructuraLigamentosService.findByName(entity.estructura_ligamento);
          if (existing) {
            throw new HttpException(`Estructura Ligamento already exists: ${entity.estructura_ligamento}`, HttpStatus.CONFLICT);
          }
          await this.estructuraLigamentosService.create({
            descripcion: entity.estructura_ligamento,
          });
        }
        break;
      case '5':
        entities = jsonData.map(row => ({
          tipo_estructural: row['NOMBRE'],
        }));
        for (const entity of entities) {
          const existing = await this.tipoEstructuralService.findByName(entity.tipo_estructural);
          if (existing) {
            throw new HttpException(`Tipo Estructural already exists: ${entity.tipo_estructural}`, HttpStatus.CONFLICT);
          }
          await this.tipoEstructuralService.create({
            tipo: entity.tipo_estructural,
          });
        }
        break;
      default:
        throw new HttpException('Invalid type parameter', HttpStatus.BAD_REQUEST);
    }

    return 'Entities created successfully';
  }
  @Post('create-telas')
  @UseInterceptors(FilesInterceptor('file'))
  async createTelas(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const file = files[0];
    const fileBuffer = file.buffer || Buffer.from(file.buffer);
    if (!fileBuffer) {
      throw new HttpException('File buffer is undefined', HttpStatus.BAD_REQUEST);
    }
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const telas = jsonData.map(row => ({
      denominacion: row['DENOMINACION'],
      composicion: row['COMPOSICION']?.split('/') || [],
      tipoEstructural: row['TIPO ESTRUCTURAL']?.split('/') || [],
      caracteristicasTecnicas: row['CARACTERISTICAS TECNICAS']?.split('-') || [],
      caracteristicasVisuales: row['CARACTERISTICAS VISUALES']?.split('') || [],
      aplicaciones: row['APLICACIONES']?.split('/') || [],
      ejemplosAplicaciones: row['EJEMPLOS APLICACIONES']?.split('/') || [],
      conservacion: row['CONSERVACION']?.split('/') || [],
      simbologia: row['SIMBOLOGIA']?.split('/') || [],
      estructuraLigamento: row['ESTRUCTURA Y LIGAMENTO']?.split('/') || [],
    }));

    var contador = 2;
    var telasList = [];

    for (const tela of telas) {
      const existingTela = await this.telaService.findByDenominacion(tela.denominacion);
      if (existingTela) {
        throw new HttpException(`Error en la linea ${contador} - Tela already exists: ${tela.denominacion}`, HttpStatus.CONFLICT);
      }

      const composicion = await Promise.all(
        tela.composicion.map(async (name) => {
          const comp = await this.composicionService.findByName(name);
          if (!comp) {
            throw new HttpException(`Error en la linea ${contador} - Composicion not found: ${name}`, HttpStatus.NOT_FOUND);
          }
          return comp.id;
        })
      );

      const tipoEstructural = await Promise.all(
        tela.tipoEstructural.map(async (name) => {
          const tipo = await this.tipoEstructuralService.findByName(name);
          if (!tipo) {
            throw new HttpException(`Error en la linea ${contador} - Tipo Estructural not found: ${name}`, HttpStatus.NOT_FOUND);
          }
          return tipo.id_tipo_estructural;
        })
      );

      const aplicaciones = await Promise.all(
        tela.aplicaciones.map(async (name) => {
          const app = await this.aplicacionesService.findByName(name);
          if (!app) {
            throw new HttpException(`Error en la linea ${contador} - Aplicaciones not found: ${name}`, HttpStatus.NOT_FOUND);
          }
          return app.id_aplicaciones;
        })
      );

      const conservacion = await Promise.all(
        tela.conservacion.map(async (name) => {
          const cons = await this.conservacionService.findByName(name);
          if (!cons) {
            throw new HttpException(`Error en la linea ${contador} - Conservacion not found: ${name}`, HttpStatus.NOT_FOUND);
          }
          return cons.id;
        })
      );

      const estructuraLigamento = await Promise.all(
        tela.estructuraLigamento.map(async (name) => {
          const estruc = await this.estructuraLigamentosService.findByName(name);
          if (!estruc) {
            throw new HttpException(`Error en la linea ${contador} - Estructura Ligamento not found: ${name}`, HttpStatus.NOT_FOUND);
          }
          return estruc.id;
        })
      );

      const cacTecnicas = await Promise.all(
        tela.caracteristicasTecnicas.map(async (name) => {
          const tecnica = await this.cacTecnicas.findByAttributes(name.param1, name.param2, name.param3);
          if (!tecnica) {
            throw new HttpException(`Error en la linea ${contador} - Caracteristicas Tecnicas not found: ${name.param1}`, HttpStatus.NOT_FOUND);
          }
          return tecnica.id;
        })
      );

      const cacVisuales = await Promise.all(
        tela.caracteristicasVisuales.map(async (name) => {
          const tecnica = await this.cacVisuales.findByAttributes(name.param1, name.param2, name.param3);
          if (!tecnica) {
            throw new HttpException(`Error en la linea ${contador} - Caracteristicas Visuales not found: ${name.param1}`, HttpStatus.NOT_FOUND);
          }
          return tecnica.id_cac_visual;
        })
      );

      const telaEntity = {
        denominacion: tela.denominacion,
        ids_composicion: composicion,
        ids_tipo_estructural: tipoEstructural,
        ids_cac_tecnica: cacTecnicas,
        ids_cac_visuales: cacVisuales,
        ids_aplicaciones: aplicaciones,
        ids_conservacion: conservacion,
        ids_estructura_ligamento: estructuraLigamento,
        id_img: ''
      };

      telasList.push(telaEntity);

      ++contador;
    }

    for (const tela of telasList) {
      await this.telaService.create(tela);
    }

    return 'Telas created successfully';
  }
}