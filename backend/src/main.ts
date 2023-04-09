import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() { 
  
  global.msg = [];
  global.roomList = [];
  const app = await NestFactory.create(AppModule, {
    cors:true
  });

  const config = new DocumentBuilder()
    .setTitle('EcommerceAPI')
    .setDescription('The Ecommerce API')
    .setVersion('1.0')
    .addTag('ecommerce')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  }); 
  await app.listen(8080);
}
bootstrap();
