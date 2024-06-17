import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: Number(process.env.DB_PORT),
  database: `${process.env.DB_DATABASE}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db-migrations/*{.ts,.js}'],
  // autoLoadEntities: true,

  /**
   * synchronize - Indicates if database schema should be auto created on every application
   * launch. Be careful with this option and don't use this in production
   * otherwise you can lose production data. This option is useful during debug and development.
   * As an alternative to it, you can use CLI and run schema:sync command.
   * Note that for MongoDB database it does not create schema, because MongoDB is schemaless.
   * Instead, it syncs just by creating indices.
   */
  synchronize: false,
};

export default new DataSource(dbConfig);
