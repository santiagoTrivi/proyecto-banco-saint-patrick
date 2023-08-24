import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const DATABASE_CONFIG = () => {
  return MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const isProduction = configService.get('NODE_ENV') === 'production';

      if (isProduction) {
        return {
          uri: configService.get('PRODUCTION_DATABASE_URL'),
          dbName: 'saint-patrick-database',
        };
      } else {
        return {
          uri: configService.get('DEVELOPMENT_DATABASE_URL'),
          dbName: 'saint-patrick-development-database',
        };
      }
    },
  });
};