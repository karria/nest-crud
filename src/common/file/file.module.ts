import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer.config';
import { ProjectController } from '@src/project/project.controller';
import { ProjectService } from '@src/project/project.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class FileModule {}
