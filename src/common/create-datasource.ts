import { DataSource, EntitySchema } from 'typeorm';

type Entity = Function | string | EntitySchema<any>;

export async function createDataSource(entities: Entity[]) {
  return new DataSource({
    type: 'better-sqlite3',
    database: ':memory:',
    entities,
    logging: true,
    synchronize: true,
  });
}