import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('API_SERVICE_PORT');
  await app.listen(port, () => {
    console.log(`Api server has ben started in port: ${port}`);
  });
}
bootstrap();
