import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoModule } from './memo/memo.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({ 
      type: 'sqlite',
      database: 'lattice.task.db',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      dropSchema: true,
    }),
    ProjectModule,
    MemoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
