import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { CORS } from './config/cors-constants';
import { STATIC_SWAGGER_DOC } from './staticSwaggerDoc';
import { SWAGGER_CONFIG } from './config/swagger.config';
import * as morgan from 'morgan';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //swagger documentation set by SWAGGER_CONFIG constant
  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup('/swagger', app, document);

  //CORS is the constant where cors configurations are stored
  app.enableCors(CORS);

  //morgan
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  await app.listen(process.env.PORT || 3000);

  STATIC_SWAGGER_DOC();

  if (process.env.NODE_ENV === 'development') {
    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'src/swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
  }
}
bootstrap();
