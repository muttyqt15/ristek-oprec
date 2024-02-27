import { Test, TestingModule } from '@nestjs/testing';
import { BphController } from '../bph.controller';

describe('BphController', () => {
  let controller: BphController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BphController],
    }).compile();

    controller = module.get<BphController>(BphController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
