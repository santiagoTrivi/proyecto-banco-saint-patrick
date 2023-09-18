import { Injectable } from "@nestjs/common";
import { CurrencyService } from "../infrastructure/services/currency.service";

@Injectable()
export class GetCurrencyInfo{

    constructor(private readonly currencyService: CurrencyService){}

    getAll = async () => {
        return await this.currencyService.findAll();
    }
}