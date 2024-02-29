import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/okk/api');

  const description = `
  Welcome to **OKK Forge**! 

  **OKK Forge** was built extensively with completely functional endpoints, entities, and is capable of all the operations in managing OKK! 

  With role-based authentication with roles like *BPH*, *PI*, *MENTEE*, and more, **OKK Forge** is a safe place to manage OKK!
  `;
  const config = new DocumentBuilder()
    .setTitle('OKK Forge Docs')
    .setDescription(description)
    .setVersion('1.0')
    .addTag('OKK API DOCS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/okk/api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const { PORT } = process.env;
  await app.listen(PORT, () => console.log(`Server running on PORT ${PORT}!`));
}
bootstrap();
