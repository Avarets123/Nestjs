import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = +process.env.BACKEND_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(port, () => {
    console.log(`Backend has ben started in port: ${port}`);
  });
}
bootstrap();
