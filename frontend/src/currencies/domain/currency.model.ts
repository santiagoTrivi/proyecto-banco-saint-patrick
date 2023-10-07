export interface CurrencyProps {
	id: string;
	name: string;
	code: string;
	symbol: string;
	isAvailable: boolean;
	flagLink: string;
}

export class Currency {
	id: string;
	name: string;
	code: string;
	symbol: string;
	isAvailable: boolean;
	flagLink: string;

	constructor(currency: CurrencyProps) {
		this.id = currency.id;
		this.name = currency.name;
		this.code = currency.code;
		this.symbol = currency.symbol;
		this.isAvailable = currency.isAvailable;
		this.flagLink = currency.flagLink;
	}

	static create(currency: CurrencyProps): Currency {
		return new Currency(currency);
	}
}
