// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_NAME) {
  throw new Error('no database name set');
}

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME,
  entities: [
    path.join(__dirname, '**/*.entity.js'),
    path.join(__dirname, '**/*.entity.ts'),
  ],
  migrations: [
    path.join(__dirname, 'migrations/*.js'),
    path.join(__dirname, 'migrations/*.ts'),
  ],
  synchronize: false,
  migrationsRun: true,
  logging: true,
});
