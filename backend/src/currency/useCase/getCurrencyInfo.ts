import { Injectable } from '@nestjs/common';
import { CurrencyService } from '../infrastructure/services/currency.service';

@Injectable()
export class GetCurrencyInfo {
  constructor(private readonly currencyService: CurrencyService) {}

  getAll = async () => {
    const currencies = await this.currencyService.findAll();

    const result = currencies.map((set) => {
      const { createdAt, updatedAt, ...rest } = set;
      return rest;
    });

    return result;
  };
}
