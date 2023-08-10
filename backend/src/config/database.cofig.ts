import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from "@nestjs/mongoose";
import { join } from "path";


export const DATABASE_CONFIG = () => {
    return MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async(configService: ConfigService) => ({
            uri: configService.get('DATABASE_URL'),
            dbName: 'saint-patrick-database',
        })
    })
}