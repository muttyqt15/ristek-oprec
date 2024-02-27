import { Test, TestingModule } from '@nestjs/testing';
import { BphService } from '../bph.service';

describe('BphService', () => {
  let service: BphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BphService],
    }).compile();

    service = module.get<BphService>(BphService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
