import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS: CorsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  preflightContinue: false,
  methods: ['*', 'PATCH'],
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Accept',
    'Origin',
    'x-refresh-token',
    'Authorization',
  ],
  credentials: true,
};
