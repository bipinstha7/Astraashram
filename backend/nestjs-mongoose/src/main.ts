// import runInCluster from './utils/cluster';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configApp } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await configApp(app);

  await app.listen(process.env.PORT || 1111);
}

bootstrap();

// runInCluster(bootstrap);
