import { Test, TestingModule } from '@nestjs/testing';
import { CreateMemoDto } from '@src/memo/dto/create-memo.dto';
import { MemoController } from '@src/memo/memo.controller';
import { MemoService } from '@src/memo/memo.service';

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

  const PROJECT_UUID = 'def';
  const MEMO_CONTENT = '계약 만료일 확인하기';

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

  describe('create()', () => {
    it('메모 생성 테스트', () => {
      mockMemoService.create.mockResolvedValue({
        id: 123,
        projectUuid: PROJECT_UUID,
        content: MEMO_CONTENT,
      });

      const createMemoDto = new CreateMemoDto();
      createMemoDto.projectUuid = PROJECT_UUID;
      createMemoDto.content = MEMO_CONTENT;
      const memo = memoController.create(createMemoDto);

      expect(memo).toBeDefined();
      expect(mockMemoService.create).toHaveBeenCalled();
      expect(mockMemoService.create).toHaveBeenCalledWith(createMemoDto);
    })
  })

  describe('', () => {
    it('프로젝트를 통한 메모 조회 테스트', () => {
      // E2E 테스트면 되지 않을까??
    })
  })
  
})
