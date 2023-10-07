export class CardNumber {
	readonly value: string;

	private constructor(value: string) {
		this.value = value;
	}

	static create(value: string): CardNumber {
		return new CardNumber(value);
	}

	format(): string {
		const groupBy = 4;
		const group = this.value.match(new RegExp(`.{1,${groupBy}}`, 'g'));
		return group ? group.join(' ') : '';
	}
}
