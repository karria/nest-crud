import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectService } from '@src/project/project.service';
import { CreateProjectDto } from '@src/project/dto/create-project.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Project } from './entity/project.entity';
import { Pagination } from '@src/common/pagination';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({
        summary: 'Create Project',
        description: `프로젝트를 생성한다.`,
    })
    @ApiResponse({ status: 200, description: '프로젝트 아이디 반환' })
    async createProject(@Body() createProjectDto: CreateProjectDto) {
        const project = await this.projectService.create(createProjectDto);
        return { uuid: project.uuid };
    }

    @Get('/:uuid')
    @HttpCode(200)
    @ApiOperation({
        summary: '프로젝트 정보 확인',
        description: `프로젝트 id를 통해 프로젝트를 하나 조회힌다.`,
    })
    @ApiResponse({ status: 200, description: '프로젝트 정보 반환' })
    getProject(@Param('uuid') uuid: string): Promise<Project> {
        return this.projectService.findOne(uuid);
    }

    @Get()
    @HttpCode(200)
    @ApiOperation({
        summary: '프로젝트 조회',
        description: `페이징 정보를 통해 프로젝트 목록을 조회한다.`,
    })
    @ApiResponse({ status: 200, description: '프로젝트 정보 목록 반환' })
    getProjectList(@Query() pagination: Pagination): Promise<Project[]> {
        return this.projectService.findAll(pagination);
    }

    @Post('/:uuid/file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Param('uuid') uuid: string, 
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addMaxSizeValidator({ maxSize: 100000000 })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                }),
        ) file: Express.Multer.File
    ) {
        const projectUuid = await this.projectService.uploadFile(uuid, file);
        return { uuid: projectUuid };
    }
}
