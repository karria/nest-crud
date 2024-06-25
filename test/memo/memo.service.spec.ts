
import { createDataSource } from "@src/common/create-datasource";
import { Memo } from "@src/memo/entities/memo.entity";
import { MemoService } from "@src/memo/memo.service";
import { Project } from "@src/project/entity/project.entity";
import { DataSource, Repository } from "typeorm";


describe('MemoService Test', () => {
  let dataSource: DataSource;
  let projectRepository: Repository<Project>;
  let memoRepository: Repository<Memo>;
  let memoService: MemoService;

  const PROJECT_TITLE = '임대계약';
  const CONTENT = '계약 만료일 확인하기';

  const saveProject = async (): Promise<Project> => {
    const project = new Project();
    project.title = PROJECT_TITLE;
    return projectRepository.save(project);
  }

  beforeAll(async () => {
    dataSource = await createDataSource([Project, Memo]);
    dataSource.initialize();

    projectRepository = dataSource.getRepository(Project);
    memoRepository = dataSource.getRepository(Memo);
    memoService = new MemoService(memoRepository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  afterEach(async () => {
    await memoRepository.query('DELETE FROM memo');
    await projectRepository.query('DELETE FROM project');
  });

  it('should be defined', () => {
    expect(memoRepository).toBeDefined();
    expect(memoService).toBeDefined();
  });

  describe('create()', () => {
    it('메모를 저장하고 객체를 반환한다.', () => {

    });

    it('프로젝트 아이디가 없는 경우 에러를 발생한다.', () => {

    });
  });

  describe('update()', () => {
    it('메모를 수정한다.', () => {

    });

    it('프로젝트 아이디가 없는 경우 에러를 발생한다.', () => {

    });

    it('메모 아이디가 없는 경우 에러를 발생한다.', () => {

    });
  });

  describe('findAll()', () => {
    it('전체 메모를 조회한다.', () => {

    });
  });

  describe('findAllByProjectUuid()', () => {
    it('프로젝트 아이디와 페이징 객체를 받아 해당 메모를 조회한다.', () => {

    });

    it('프로젝트 아이디가 없는 경우 에러 발생한다.', () => {

    });
  });

  describe('remove()', () => {
    it('메모 아이디와 프로젝트 아이디를 받아 해당 메모를 삭제하고 삭제하고 true 반환', () => {

    });

    it('실제 삭제되지 않았을 경우 false 반환', () => {

    });
  });
})
