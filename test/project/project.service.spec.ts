import { ProjectService } from '@src/project/project.service';
import { Project } from '@src/project/entity/project.entity';
import { CreateProjectDto } from '@src/project/dto/create-project.dto';
import { Pagination } from '@src/common/pagination';
import { DataSource, Repository } from 'typeorm';
import { createDataSource } from '@src/common/create-datasource';


describe('ProjectService Test', () => {
  let dataSource: DataSource;
  let projectRepository: Repository<Project>;
  let projectService: ProjectService;

  const TITLE = 'NBA 중계 협상 건';

  beforeAll(async () => {
    dataSource = await createDataSource([Project]);
    dataSource.initialize();

    projectRepository = dataSource.getRepository(Project);
    projectService = new ProjectService(projectRepository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  afterEach(async () => {
    await projectRepository.query('DELETE FROM project');
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
    expect(dataSource).toBeDefined();
  });

  describe('create()', () => {
    it('프로젝트를 생성하고 저장된 프로젝트 객체를 반환한다.', async () => {
      const inputData: CreateProjectDto = {
        title: 'NBA 중계 협상 건'
      };
      
      const result = await projectService.create(inputData);

      expect(result).toBeDefined();
      expect(result.uuid).not.toBeNull();
      
    });
  });

  describe('update()', () => {
    it('프로젝트를 수정하고 수정된 프로젝트 객체를 반환한다.', () => {

    });
  });

  describe('findOne()', () => {
    it('프로젝트 아이디를 받아 프로젝트를 반환한다.', async () => {
      const inputData: CreateProjectDto = {
        title: '임대계약'
      };

      const insertData: Project = await projectService.create(inputData);

      const result: Project = await projectService.findOne(insertData.uuid);
      expect(result).toBeDefined();
      expect(result.title).toBe(inputData.title);
    });
  });

  describe('findAll()', () => {
    it('페이징 정보를 받아 프로젝트 목록을 반환한다.', async () => {
      let pagination = new Pagination();
      pagination.page = 0;
      pagination.size = 20;

      const projects = await projectService.findAll(pagination);
      expect(projects).toBeDefined();
      expect(projects.length).toBe(2);
    });
  });

  describe('remove()', () => {
    it('프로젝트 아이디를 받아 프로젝트를 삭제하고 true를 반환한다.', () => {

    });
  });
})
