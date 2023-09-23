import { DomainRepository } from '@common/domain/interface/IDomainRepository.interface';
import { CurrencyEntity } from '../currencyEntity';

export type CurrencyReposipty = DomainRepository<CurrencyEntity>;
