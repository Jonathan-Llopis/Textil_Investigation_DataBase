import {
  Post,
  Get,
  Param,
  Res,
  Controller,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { FileResponseVm } from './view-models/file-response-vm.model';
import { FileInfoVm } from './view-models/file-info-vm.model';
import { TelaService } from 'src/tela/tela.service';
import * as XLSX from 'xlsx';
import { ComposicionService } from 'src/composicion/composicion.service';
import { AplicacionesService } from 'src/aplicaciones/aplicaciones.service';
import { ConservacionService } from 'src/conservacion/conservacion.service';
import { TipoEstructuralService } from 'src/tipo_estructural/tipo_estructural.service';
import { EstructuraLigamentosService } from 'src/estructura-ligamento/estructura-ligamento.service';

@Controller('/files')
export class FilesController {
  constructor(
    private filesService: FilesService,
    private readonly telaService: TelaService,
    private readonly composicionService: ComposicionService,
    private readonly aplicacionesService: AplicacionesService,
    private readonly conservacionService: ConservacionService,
    private readonly tipoEstructuralService: TipoEstructuralService,
    private readonly estructuraLigamentosService: EstructuraLigamentosService,
  ) {}

  @Post('')
  @UseInterceptors(FilesInterceptor('file'))
  upload(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        id: file.id,
        filename: file.filename,
        metadata: file.metadata,
        bucketName: file.bucketName,
        chunkSize: file.chunkSize,
        size: file.size,
        md5: file.md5,
        uploadDate: file.uploadDate,
        contentType: file.contentType,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Post('tela/:id')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFilesToTela(@UploadedFiles() files, @Param('id') id_tela: string) {
    console.log(files);
    const response = [];

    files.forEach((file) => {
      const fileId = file.id.toString();
      this.telaService.update(parseInt(id_tela), {
        id_img: fileId,
      });
      const fileReponse = {
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        id: file.id,
        filename: file.filename,
        metadata: file.metadata,
        bucketName: file.bucketName,
        chunkSize: file.chunkSize,
        size: file.size,
        md5: file.md5,
        uploadDate: file.uploadDate,
        contentType: file.contentType,
        id_img: fileId,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get()
  async getAllFiles(): Promise<{ id: string; file: FileInfoVm }[]> {
    const files = await this.filesService.findAll();
    return files;
  }
  @Get('info/:id')
  async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file info',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return {
      message: 'File has been detected',
      file: file,
    };
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    res.header('Content-Type', file.contentType);
    return filestream.pipe(res);
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    res.header('Content-Type', file.contentType);
    res.header('Content-Disposition', 'attachment; filename=' + file.filename);
    return filestream.pipe(res);
  }

  @Get('delete/:id')
  async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.deleteFile(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred during file deletion',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return {
      message: 'File has been deleted',
      file: file,
    };
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

  let entities: any[];
  switch (type) {
    case '1':
      entities = jsonData.map(row => ({
        aplicacion: row['nombre'],
      }));
      console.log(entities);
      for (const entity of entities) {
      await this.aplicacionesService.create({
        tipo_aplicacion: entity.aplicacion,
      });
      }
      break;
    case '2':
      entities = jsonData.map(row => ({
        composicion: row['nombre'],
      }));
      console.log(entities);
      for (const entity of entities) {
        await this.composicionService.create({
          descripcion: entity.composicion,
        });
      }
      break;
    case '3':
      entities = jsonData.map(row => ({
        conservacion: row['nombre'],
      }));
      console.log(entities);
      for (const entity of entities) {
        await this.conservacionService.createConservacion({
           description: entity.conservacion
        });
      }
      break;
    case '4':
      entities = jsonData.map(row => ({
        estructura_ligamento: row['nombre'],
      }));
      console.log(entities);
      for (const entity of entities) {
        await this.estructuraLigamentosService.create({
          descripcion: entity.estructura_ligamento,
        });
      }
      break;
    case '5':
      entities = jsonData.map(row => ({
        tipo_estructural: row['nombre'],
      }));
      console.log(entities);
      for (const entity of entities) {
        await this.tipoEstructuralService.create({
          tipo: entity.tipo_estructural,
        });
      }
      break;
    default:
      throw new HttpException('Invalid type parameter', HttpStatus.BAD_REQUEST);
  }

  return { message: 'Entities created successfully', entities };
}
}