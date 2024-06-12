import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import modules from './modules';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { iEnvirontVariables, validate } from './config/config.validation';

const database = [];
if (process.env.NODE_ENV !== 'test') {
  database.push(
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<iEnvirontVariables>) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
  );
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
