import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as express from 'express';
// import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { ConfigModule, ConfigService } from '@lib/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
// import { ConfigModule } from './lib/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // =================================
  // configureExpressSettings
  // =================================
  app.set('etag', 'strong');
  app.set('trust proxy', true);
  app.set('x-powered-by', false);

  // =================================
  // configureExpressMiddleware
  // =================================
  // app.use('/', express.static('public'));
  app.enableCors({ origin: true });
  app.setViewEngine('pug');
  app.setBaseViewsDir(resolve('.', 'views'));
  app.useStaticAssets(resolve('.', 'public'));
  app.use(express.json({ limit: '5mb' }));
  app.use(compression());
  // app.use(helmet({ contentSecurityPolicy: { reportOnly: true } }));
  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      errorHttpStatusCode: 422,
    }),
  );
  const config = app.select(ConfigModule).get(ConfigService).env;
  const authGuard = app.select(AuthModule).get(AuthGuard);
  app.useGlobalGuards(authGuard);
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      errorHttpStatusCode: 422,
    }),
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Core Project')
    .setVersion('1.0.0')
    .addTag('Core')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  console.log(`app running port ${config.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
