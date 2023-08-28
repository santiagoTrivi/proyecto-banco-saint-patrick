import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DATABASE_CONFIG } from './config/database.cofig';
import { TransferModule } from './transfer/transfer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// DATABASE_CONFIG is the function to retrieve the database configuration, based on the NODE_env for production or development environment

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    DATABASE_CONFIG(),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TransferModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
