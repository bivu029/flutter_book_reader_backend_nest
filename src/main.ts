import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  ValidationPipe, VersioningType } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  server.use('/uploads', express.static('uploads')); // Serve static files from 'uploads

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  //  "app.enableVersioning()"
app.enableVersioning({
  type: VersioningType.URI,
});
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


