import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import modules from './modules';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { dbConfig } from './config/typeorm.config';
import { validate } from './config/config.validation';

const database = [];
if (process.env.NODE_ENV !== 'test') {
  database.push(TypeOrmModule.forRoot(dbConfig));
}

@Module({
  imports: [
    ...modules,
    ...database,
    ConfigModule.forRoot({
      validate,
      cache: true,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
