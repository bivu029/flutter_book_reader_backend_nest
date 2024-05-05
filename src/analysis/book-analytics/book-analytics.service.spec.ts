import { Test, TestingModule } from '@nestjs/testing';
import { BookAnalyticsService } from './book-analytics.service';

describe('BookAnalyticsService', () => {
  let service: BookAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookAnalyticsService],
    }).compile();

    service = module.get<BookAnalyticsService>(BookAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
