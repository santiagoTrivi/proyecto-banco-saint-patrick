import { DocumentBuilder } from "@nestjs/swagger";


export const SWAGGER_CONFIG = new DocumentBuilder()
.setTitle('API Documentation for bank process')
.setDescription('The cats API description')
.setVersion('1.0')
.addTag('auth')
.addBearerAuth()
.build();