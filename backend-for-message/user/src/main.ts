import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const port = config.get('USER_PORT');

  // await app.listen(port, () => {
  //   console.log(`User service started in port: ${port}`);
  // });

  await app.init();
  console.log('User service started!');
}
bootstrap();
