import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyErrorCatcher } from 'middleware/MyErrorCatcher';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MyErrorCatcher());

  await app.listen(process.env.PORT);

  console.log(
    '\x1b[36m%s\x1b[0m',
    'NestJs сервер' + ` ${process.env.PORT}` + ' ---> порт дээр аслаа',
  );

  // ! server дээр гарсан алдааг terminal дээр барьж авах код бичих
}
bootstrap();
