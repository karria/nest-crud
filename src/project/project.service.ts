import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Pagination } from 'src/common/pagination';


@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) 
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const result = await this.projectRepository.save({...createProjectDto});
    return result;
  }

  async modify(updateProjectDto: UpdateProjectDto): Promise<Project> {
  
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

  async delete(uuid: string): Promise<boolean> {
    const result = await this.projectRepository.delete({ uuid: uuid });
    return result.affected ? true : false;
  }
}
