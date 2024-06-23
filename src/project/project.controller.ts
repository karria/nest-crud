import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    createProject(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.createProject(createProjectDto);
    }

    @Get()
    getProject(): String {
        return "getProject";
    }
    
}
