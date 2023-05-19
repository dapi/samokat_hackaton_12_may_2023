import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  setupValidation(app);
  setupSwagger(app);
  await app.listen(3003);
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('My space API')
    .setDescription('API that allows managing my space functionality')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

function setupValidation(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
}

bootstrap();
