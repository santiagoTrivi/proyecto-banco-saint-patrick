interface CardCreateProps {
	PIN: string;
	currencyId: string;
}

export class CardCreate {
	readonly PIN: string;
	readonly currencyId: string;

	constructor(porps: CardCreateProps) {
		this.PIN = porps.PIN;
		this.currencyId = porps.currencyId;
	}

	static create(props: CardCreateProps) {
		return new CardCreate(props);
	}
}
