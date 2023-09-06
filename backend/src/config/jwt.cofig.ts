import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const CONFIG_JWT_TIMING = {
  access_token_expireIn: '60s',
  refresh_token_expireIn: '7d'
}

export const JWT_CONFIG = async () => {
  return await JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('PRIVATE_KEY'),
      signOptions: { expiresIn: CONFIG_JWT_TIMING.access_token_expireIn },
    }),
  });
};
