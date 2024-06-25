import { Test, TestingModule } from '@nestjs/testing';
import { MemoController } from '@src/memo/memo.controller';
import { MemoService } from '@src/memo/memo.service';
import exp from 'constants';

const mockMemoService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}

describe('MemoController', () => {
  let memoController: MemoController;
  let memoService: MemoService;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoController],
      providers: [
        {
          provide: MemoService,
          useValue: mockMemoService
        }
      ],
    }).compile();

    memoController = module.get<MemoController>(MemoController);
    memoService = module.get<MemoService>(MemoService);
  });

  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(memoController).toBeDefined();
    expect(memoService).toBeDefined();
  });
});
