import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrencyEntity } from '../domain/currencyEntity';
import { CurrencyService } from '../infrastructure/services/currency.service';
import { ICurrency } from '../domain/interface/ICurrency';

@Injectable()
export class RegisterCurrency {
  constructor(private readonly currencyService: CurrencyService) {}

  async run(createCurrency: ICurrency): Promise<CurrencyEntity> {
    const { name, code, symbol, flag_link } = createCurrency;
    const IS_CURRENCY_REGISTERED = await this.currencyService.findOne({ name });

    if (IS_CURRENCY_REGISTERED) {
      throw new BadRequestException('CURRENCY_ALREADY_REGISTERED');
    }

    const currency = new CurrencyEntity(
      undefined,
      name,
      code,
      symbol,
      true,
      flag_link,
    );

    return await this.currencyService.create(currency);
  }
}
