interface MoneyProps {
	value: number;
	currencyCode: string;
}

export class Money {
	value: number;
	currencyCode: string;

	constructor(props: MoneyProps) {
		this.value = props.value;
		this.currencyCode = props.currencyCode;
	}

	static create(props: MoneyProps): Money {
		return new Money(props);
	}

	format() {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: this.currencyCode
		}).format(this.value);
	}
}
