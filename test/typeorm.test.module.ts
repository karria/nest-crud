import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMTestModule = (entities: any[]) => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
      database: ':memory',
      autoLoadEntities: true,
      synchronize: true,
      entities: [...entities],
      // logging: true,
      dropSchema: true,
  }),
];

