import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

import metadata from './metadata';
import { AppModule } from './app.module';
// import runInCluster from './utils/cluster';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'], // Replace with your React app's URL
    credentials: true,
  });

  app.use(helmet());
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  /**
   * If our handler expects email and password properties, but a request also includes
   * an age property, this property can be automatically removed from the resulting DTO.
   * To enable such behavior, set whitelist to true
   *
   * Payloads coming in over the network are plain JavaScript objects. The ValidationPipe can
   * automatically transform payloads to be objects typed according to their DTO classes.
   * To enable auto-transformation, set transform to true.
   * It will also perform conversion of primitive types.
   * By default, every path parameter and query parameter comes over the network as a string.
   * If we have '@Param('id') id: number', ValidationPipe will try to automatically convert
   * a string identifier to a number.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new UnprocessableEntityException(result, 'Validation Exception');
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Astrashram API Docs')
    .setVersion('1.0')
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 1111);
}

bootstrap();

// runInCluster(bootstrap);
