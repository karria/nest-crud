import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from '@src/project/project.controller';
import { ProjectService } from '@src/project/project.service';

const mockProjectService = {
  createProject: jest.fn()
}

describe('ProjectController', () => {
  let projectController: ProjectController;
  let projectService: ProjectService;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useValue: mockProjectService
        }
      ]
    }).compile();

    projectController = module.get<ProjectController>(ProjectController);
    projectService = module.get<ProjectService>(ProjectService);
  });

  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(projectController).toBeDefined();
    expect(projectService).toBeDefined();
  });

  describe('[e2e] POST /v1/auth/signup', () => {
    it('createProject', () => {

    })
  });

  
});
