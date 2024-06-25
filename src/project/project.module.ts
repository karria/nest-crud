import { Module } from '@nestjs/common';
import { ProjectController } from '@src/project/project.controller';
import { ProjectService } from '@src/project/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@src/project/entity/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project])
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
