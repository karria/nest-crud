import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  createProject(createProjectDto: CreateProjectDto): string {
    throw new Error('Method not implemented.');
  }
}
