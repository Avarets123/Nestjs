import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('GROUP_SERVICE_PORT');
  await app.listen(port, () => {
    console.log(`Group service has been started in port: ${port}`);
  });
}
bootstrap();
