import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description } from './utils/description';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/okk/api');

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
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => console.log(`Server running on PORT ${PORT}!`));
}
bootstrap();
