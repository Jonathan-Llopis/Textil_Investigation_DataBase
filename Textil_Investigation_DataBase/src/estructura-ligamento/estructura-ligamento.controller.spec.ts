import { Test, TestingModule } from '@nestjs/testing';
import { EstructuraLigamentoController } from './estructura-ligamento.controller';

describe('EstructuraLigamentoController', () => {
  let controller: EstructuraLigamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstructuraLigamentoController],
    }).compile();

    controller = module.get<EstructuraLigamentoController>(EstructuraLigamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
