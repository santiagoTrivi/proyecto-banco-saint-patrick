import { Card } from '@/cards/domain';
import { Currency } from '@/currencies/domain';
import { Money } from '@/shared/domain';

export enum MovementType {
	DEPOSIT = 'DEPOSIT',
	TRANSFERENCE = 'TRANSFERENCE'
}

export abstract class MovementBase {
	abstract id: string;
	abstract amount: Money;
	abstract concept: string;
	abstract currency: Currency;
	abstract createdAt: Date;
	abstract updatedAt: Date;
	abstract cardId: Card['id'];

	// static isDeposit(other: unknown): other is Deposit;
	static isDeposit(movement: Movement): movement is Deposit {
		return movement?.type === MovementType.DEPOSIT;
	}

	// static isTransference(other: unknown): other is Transference;
	static isTransference(movement: Movement): movement is Transference {
		return movement?.type === MovementType.TRANSFERENCE;
	}
}

export interface DepositProps extends MovementBase {
	type: MovementType.DEPOSIT;
}
export class Deposit extends MovementBase implements DepositProps {
	id: string;
	amount: Money;
	concept: string;
	currency: Currency;
	type: MovementType.DEPOSIT;
	createdAt: Date;
	updatedAt: Date;
	cardId: string;

	constructor(deposit: DepositProps) {
		super();
		this.id = deposit.id;
		this.amount = deposit.amount;
		this.concept = deposit.concept;
		this.currency = deposit.currency;
		this.type = deposit.type;
		this.createdAt = deposit.createdAt;
		this.updatedAt = deposit.updatedAt;
		this.cardId = deposit.cardId;
	}

	static create(deposit: DepositProps): Deposit {
		return new Deposit(deposit);
	}
}

export interface TransferenceProps extends MovementBase {
	type: MovementType.TRANSFERENCE;
	toCardId: Card['id'];
}
export class Transference extends MovementBase implements TransferenceProps {
	toCardId: string;
	id: string;
	amount: Money;
	concept: string;
	currency: Currency;
	type: MovementType.TRANSFERENCE;
	createdAt: Date;
	updatedAt: Date;
	cardId: string;

	constructor(transference: TransferenceProps) {
		super();
		this.toCardId = transference.toCardId;
		this.id = transference.id;
		this.amount = transference.amount;
		this.concept = transference.concept;
		this.currency = transference.currency;
		this.type = transference.type;
		this.createdAt = transference.createdAt;
		this.updatedAt = transference.updatedAt;
		this.cardId = transference.cardId;
	}

	static create(transference: TransferenceProps): Transference {
		return new Transference(transference);
	}
}

export type Movement = Deposit | Transference;

export function MovementFactory(movement: DepositProps): Deposit;
export function MovementFactory(movement: TransferenceProps): Transference;
export function MovementFactory(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	movement: Movement
): Movement {
	if (MovementType.DEPOSIT === movement.type) {
		return Deposit.create(movement);
	}

	return Transference.create(movement);
}
