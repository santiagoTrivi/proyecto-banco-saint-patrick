import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"



export const JWT_CONFIG = () => {
    return JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get('PRIVATE_KEY'),
            signOptions: {expiresIn: '15s'}
        })
    })
}