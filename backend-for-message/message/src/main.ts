import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = config.get('MESSAGE_SERVICE_PORT');
  await app.listen(port, () => {
    console.log(`Message service has ben started in port: ${port}`);
  });
}
bootstrap();
