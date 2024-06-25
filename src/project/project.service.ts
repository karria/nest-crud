import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '@src/project/dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '@src/project/entity/project.entity';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from '@src/project/dto/update-project.dto';
import { Pagination } from '@src/common/pagination';

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

  async update(updateProjectDto: UpdateProjectDto): Promise<Project> {
  
    const project = await this.projectRepository.findOne({
      where: { uuid: updateProjectDto.uuid },
    });
    
    const updateProject = {
      ...project,
      ...updateProjectDto,
    };
    
    const result = await this.projectRepository.save(updateProject);
    return result;
  }

  async findOne(uuid: string): Promise<Project> {
    return await this.projectRepository.findOne({
      where: { uuid: uuid },
      relations: ['memos']
    });
  }

  async findAll(pagination: Pagination): Promise<Project[]> {

    const proejcts = await this.projectRepository.find({
      order: { createdAt: 'DESC' },
      skip: pagination.getSkip(),
      take: pagination.getSize(),
      relations: ['memos']
    });

    return proejcts;
  }

  async remove(uuid: string): Promise<boolean> {
    const result = await this.projectRepository.delete({ uuid: uuid });
    return result.affected ? true : false;
  }

  async uploadFile(uuid: string, file: Express.Multer.File): Promise<string> {
    const project = await this.projectRepository.findOne({
      where: { uuid: uuid },
    });

    const updateProject = {
      ...project,
      fileUrl: file.path,
    };

    const result = await this.projectRepository.save(updateProject);
    return result.uuid;
  }
}
