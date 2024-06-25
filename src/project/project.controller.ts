import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from '@src/project/project.service';
import { CreateProjectDto } from '@src/project/dto/create-project.dto';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    createProject(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }

    @Get()
    getProject(): String {
        return "getProject";
    }
    
}
