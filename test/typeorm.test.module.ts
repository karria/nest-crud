import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMTestModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'sqlite',
      database: 'lattice.task.db',
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
      dropSchema: true,
  });