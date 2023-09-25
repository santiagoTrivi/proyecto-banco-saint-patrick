import { CurrencyEntity } from "src/currency/domain/currencyEntity"


export const currencyStub = (): CurrencyEntity => {
    return {
        _id: '123456',
        name: 'United States Dollar',
        code: 'USD',
        symbol: '$',
        isAvailable: true,
        flag_link: ''
    }
}

export const currenciesListStub = () => {
    return [
        {
            id: new Date().getTime(),
            name: 'United States Dollar',
            code: 'USD',
            symbol: '$',
            isActve: true
        },
        {
            id: new Date().getTime(),
            name: 'Euro Member Countries',
            code: 'EUR',
            symbol: '€',
            isActve: true
        },
        {
            id: new Date().getTime(),
            name: 'Canada Dollar',
            code: 'CAD',
            symbol: '$',
            isActve: true
        }
    ]
}