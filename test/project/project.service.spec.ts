import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from '../../src/project/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMTestModule } from '../../test/typeorm.test.module';
import { Project } from '../../src/project/entity/project.entity';
import { CreateProjectDto } from 'src/project/dto/create-project.dto';
import { Pagination } from '../../src/common/pagination';


let service: ProjectService;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      TypeORMTestModule([Project]),
      TypeOrmModule.forFeature([Project]),
    ],
    providers: [ProjectService],
  }).compile();

  service = module.get<ProjectService>(ProjectService);
});

describe('ProjectService', () => {
  let insertCount = 0;

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('프로젝트를 생성하고 저장된 프로젝트 객체를 반환한다.', async () => {
      const inputData: CreateProjectDto = {
        title: 'NBA 중계 협상 건'
      };
      
      const result = await service.create(inputData);
      insertCount++;

      expect(result).toBeDefined();
      expect(result.uuid).not.toBeNull();
      
    });
  });

  describe('modify', () => {
    it('프로젝트를 수정하고 수정된 프로젝트 객체를 반환한다.', () => {

    });
  });

  describe('findOne', () => {
    it('프로젝트 아이디를 받아 프로젝트를 반환한다.', async () => {
      const inputData: CreateProjectDto = {
        title: '임대계약'
      };

      const insertData: Project = await service.create(inputData);
      insertCount++;

      const result: Project = await service.findOne(insertData.uuid);
      expect(result).toBeDefined();
      expect(result.title).toBe(inputData.title);
    });
  });

  describe('findAll', () => {
    it('페이징 정보를 받아 프로젝트 목록을 반환한다.', async () => {
      let pagination = new Pagination();
      pagination.page = 0;
      pagination.size = 20;

      const projects = await service.findAll(pagination);
      expect(projects).toBeDefined();
      expect(projects.length).toBe(2);
    });
  });

  describe('delete', () => {
    it('프로젝트 아이디를 받아 프로젝트를 삭제하고 true를 반환한다.', () => {

    });
  });
});
