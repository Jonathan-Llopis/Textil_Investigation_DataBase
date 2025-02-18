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


@Controller('/files')
export class FilesController {
  constructor(
    private filesService: FilesService,
    private readonly telaService: TelaService,
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

  @Post('tela')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFilesToTela(@UploadedFiles() files, @Param('id') id_tela: string) {
    const response = [];
    files.forEach((file) => {
     
      try {
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
        console.log(fileReponse);
        if (!file.id) {
          throw new HttpException('File ID is undefined', HttpStatus.BAD_REQUEST);
        }
        const fileNameWithoutExtension = file.filename.split('.').slice(0, -1).join('.');
        console.log(fileNameWithoutExtension.toUpperCase());
        this.telaService.updateImg(fileNameWithoutExtension.toUpperCase(), file.id);
        response.push(fileReponse);
      } catch (error) {
        console.error('Error uploading file:', error);
        throw new HttpException(`Error en la imagen: ${file.name} `, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
    return "Files uploaded successfully";
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
}
