import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { TelaUserService } from './tela_user.service';

@Controller('tela-user')
export class TelaUserController {
  constructor(private readonly telaUserService: TelaUserService) {}

  // Agregar un usuario a una tela
  @Post(':id_tela')
  async addUserToTela(
    @Param('id_tela') idTela: number,
    @Body('id_user') idUser: number,
  ) {
    return this.telaUserService.addUserToTela(idTela, idUser);
  }

  // Obtener usuarios de una tela
  @Get(':id_tela')
  async findUsersByTela(@Param('id_tela') idTela: number) {
    return this.telaUserService.findUsersByTela(idTela);
  }

  // Eliminar un usuario de una tela
  @Delete(':id_tela/:id_user')
  async removeUserFromTela(
    @Param('id_tela') idTela: number,
    @Param('id_user') idUser: number,
  ) {
    return this.telaUserService.removeUserFromTela(idTela, idUser);
  }

  // Eliminar todos los usuarios de una tela
  @Delete(':id_tela')
  async removeAllUsersFromTela(@Param('id_tela') idTela: number) {
    return this.telaUserService.removeAllUsersFromTela(idTela);
  }
}
