import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '@src/project/dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '@src/project/entity/project.entity';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from '@src/project/dto/update-project.dto';
import { Pagination } from '@src/common/pagination';
import { Memo } from '@src/memo/entities/memo.entity';


@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) 
    private readonly projectRepository: Repository<Project>,
    // private readonly memoRepository: Repository<Memo>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const result = await this.projectRepository.save({...createProjectDto});
    return result;
  }

  async update(updateProjectDto: UpdateProjectDto): Promise<Project> {
  
    const product = await this.projectRepository.findOne({
      where: { uuid: updateProjectDto.uuid },
    });
    
    const updateProject = {
      ...product,
      ...updateProjectDto,
    };
    
    const result = await this.projectRepository.save(updateProject);
    return result;
  }

  async findOne(uuid: string): Promise<Project> {
    return await this.projectRepository.findOne({
      where: { uuid: uuid },
    });
  }

  async findAll(pagination: Pagination): Promise<Project[]> {

    const [proejcts, total] = await this.projectRepository.findAndCount({
      order: { createdAt: 'ASC' },
      skip: pagination.getSkip(),
      take: pagination.getSize(),
    });

    return proejcts;
  }

  async remove(uuid: string): Promise<boolean> {
    const result = await this.projectRepository.delete({ uuid: uuid });
    return result.affected ? true : false;
  }
}
