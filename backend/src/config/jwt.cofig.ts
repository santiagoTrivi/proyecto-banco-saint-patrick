import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const JWT_CONFIG = async () => {
  return await JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('PRIVATE_KEY'),
      signOptions: { expiresIn: '60s' },
    }),
  });
};
