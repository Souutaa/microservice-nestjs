import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from 'shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  logger.info('Server is running on port 3000');
}
bootstrap();
