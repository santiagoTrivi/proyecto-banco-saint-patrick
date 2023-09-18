import { ICurrency } from "./interface/ICurrency";

export class CurrencyEntity implements ICurrency{
    constructor(
        public _id: string,
        public name: string,
        public code: string,
        public symbol: string,
        public isAvailable: boolean,
        public flag_link: string,
        public createdAt?: Date,
        public updatedAt?: Date,
    ){}

    static getCurrencyEntity(data: any): CurrencyEntity {
        const {
          _id,
          name,
          code,
          symbol,
          isAvailable,
          flag_link,
          createdAt,
          updatedAt,
        } = data;
    
        return new CurrencyEntity(
            _id,
            name,
            code,
            symbol,
            isAvailable,
            flag_link,
            createdAt,
            updatedAt,
        );
      }
}