import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DATABASE_CONFIG } from './config/database.cofig';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ClientModule } from './client/client.module';
import { CardModule } from './card/card.module';
import { CurrencyModule } from './currency/currency.module';
import { MovementModule } from './movement/movement.module';

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
    ClientModule,
    CardModule,
    CurrencyModule,
    MovementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
