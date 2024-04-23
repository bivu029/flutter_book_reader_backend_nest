import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      
      whitelist: true,
      //forbidNonWhitelisted: true,
      transform: true, // Enable the transform option
    }),
  );

  app.enableCors();
  await app.listen(3000, () => {
    console.log(`server started at 3000 port link http://localhost:3000/`);

  });
}
bootstrap();


