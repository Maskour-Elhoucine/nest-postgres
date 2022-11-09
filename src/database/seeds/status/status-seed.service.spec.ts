import { Test, TestingModule } from '@nestjs/testing';
import { StatusSeedService } from './status-seed.service';

describe('StatusSeedService', () => {
  let service: StatusSeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusSeedService],
    }).compile();

    service = module.get<StatusSeedService>(StatusSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
