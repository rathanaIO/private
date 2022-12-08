"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const config_1 = require("./lib/config");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth/auth.guard");
const auth_module_1 = require("./auth/auth.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.set('etag', 'strong');
    app.set('trust proxy', true);
    app.set('x-powered-by', false);
    app.enableCors({ origin: true });
    app.setViewEngine('pug');
    app.setBaseViewsDir((0, path_1.resolve)('.', 'views'));
    app.useStaticAssets((0, path_1.resolve)('.', 'public'));
    app.use(express.json({ limit: '5mb' }));
    app.use(compression());
    app.use(morgan('dev'));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        forbidNonWhitelisted: false,
        errorHttpStatusCode: 422,
    }));
    const config = app.select(config_1.ConfigModule).get(config_1.ConfigService).env;
    const authGuard = app.select(auth_module_1.AuthModule).get(auth_guard_1.AuthGuard);
    app.useGlobalGuards(authGuard);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        forbidNonWhitelisted: false,
        errorHttpStatusCode: 422,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Core Project')
        .setVersion('1.0.0')
        .addTag('Core')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    console.log(`app running port ${config.PORT}`);
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map