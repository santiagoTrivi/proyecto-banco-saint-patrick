import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";


export const CORS: CorsOptions = {
    origin: true,
    optionsSuccessStatus: 204,
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    allowedHeaders: [
        'Authorization',
        'Access-Control-Allow-Origin',
		'Content-Type',
		'Accept',
		'Origin',
    ],
    credentials: true,
}