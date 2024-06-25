import { Module } from '@nestjs/common';
import { ProjectController } from '@src/project/project.controller';
import { ProjectService } from '@src/project/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '@src/project/entity/project.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '@src/common/file/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
