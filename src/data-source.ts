// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

let database: string;
let entities: any[];
let migrations: string[];

switch (env) {
  case 'development':
    database = 'db.sqlite';
    entities = [
      path.join(__dirname, '**/*.entity.js'),
      path.join(__dirname, '**/*.entity.ts'),
    ];
    migrations = [path.join(__dirname, 'migrations/*.ts')];
    break;

  case 'test':
    database = 'test.sqlite';
    entities = [path.join(__dirname, '**/*.entity.ts')];
    migrations = [path.join(__dirname, 'migrations/*.ts')];
    break;

  case 'production':
    database = 'db.sqlite';
    entities = [path.join(__dirname, '**/*.entity.js')];
    migrations = [path.join(__dirname, 'migrations/*.js')];
    break;

  default:
    throw new Error(`Unknown environment: ${env}`);
}

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database,
  entities,
  migrations,
  synchronize: false,
  migrationsRun: true,
  logging: true,
});

console.log(AppDataSource.options.entities);
