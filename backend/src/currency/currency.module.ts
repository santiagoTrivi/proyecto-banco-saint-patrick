import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, CurrencySchema } from './infrastructure/schemas/currency.schema';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './infrastructure/services/currency.service';
import { RegisterCurrency } from './useCase/registerCurrency';
import { GetCurrencyInfo } from './useCase/getCurrencyInfo';

@Module({
    imports:[
        MongooseModule.forFeature([{name: Currency.name, schema: CurrencySchema}])
    ],
    controllers: [CurrencyController],
    providers: [CurrencyService, RegisterCurrency, GetCurrencyInfo],
    exports:[CurrencyService]
})
export class CurrencyModule {}
