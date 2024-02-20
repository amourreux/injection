import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest Api')
    .setDescription('The nest API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('SESSIONID')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
