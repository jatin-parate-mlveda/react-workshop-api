import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(app.get(Reflector), {
  //     enableImplicitConversion: true,
  //   }),
  // );

  const configService = app.get<ConfigService>(ConfigService);
  const port = Number.parseInt(configService.get<string>('PORT')!, 10);
  const nodeEnv = configService.get('NODE_ENV');

  if (nodeEnv === 'local') {
    app.useLogger(['debug', 'error', 'log', 'verbose', 'warn']);
  } else {
    app.useLogger(['error', 'log']);
  }

  const config = new DocumentBuilder()
    .setTitle('Workshop api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
}
bootstrap();
