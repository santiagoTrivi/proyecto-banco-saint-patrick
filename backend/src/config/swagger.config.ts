import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('API Documentation for bank process')
  .setDescription('Saint Patrick Bank API allows client to register and have multiple cards to make movements such as deposit or transference.')
  .setVersion('1.0')
  .addTag('auth')
  .addBearerAuth()
  .build();
