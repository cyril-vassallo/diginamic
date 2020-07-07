import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .setTitle('Hotel')
    .setDescription('This is an api Booking')
    .setVersion('1.0')
    .addTag('Reservations')
    .addTag('Categories')
    .addTag('Periods')
    .addTag('Booking')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
