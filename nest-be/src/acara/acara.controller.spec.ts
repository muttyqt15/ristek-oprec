import { Test, TestingModule } from '@nestjs/testing';
import { AcaraController } from './acara.controller';

describe('AcaraController', () => {
  let controller: AcaraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcaraController],
    }).compile();

    controller = module.get<AcaraController>(AcaraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
