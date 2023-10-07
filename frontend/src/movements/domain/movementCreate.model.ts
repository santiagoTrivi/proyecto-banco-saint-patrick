import { Card } from '@/cards/domain';
import { MovementType } from './movement.model';

interface MovementCreateBase {
	amount: number;
	cardId: Card['id'];
	concept: string;
	PIN: string;
}

interface DepositCreateProps extends MovementCreateBase {
	type: MovementType.DEPOSIT;
}
export class DepositCreate implements DepositCreateProps {
	amount: number;
	cardId: Card['id'];
	concept: string;
	PIN: string;
	type: MovementType.DEPOSIT;

	constructor(deposit: DepositCreateProps) {
		this.amount = deposit.amount;
		this.cardId = deposit.cardId;
		this.concept = deposit.concept;
		this.PIN = deposit.PIN;
		this.type = MovementType.DEPOSIT;
	}

	static create(deposit: DepositCreate): DepositCreate {
		return new DepositCreate(deposit);
	}
}

interface TransferenceCreateProps extends MovementCreateBase {
	toCard: Card['id'];
	type: MovementType.TRANSFERENCE;
}
export class TransferenceCreate implements TransferenceCreateProps {
	amount: number;
	cardId: Card['id'];
	// toCard: '6509342f9db7c53d6731b39c'
	toCard: Card['id'];
	concept: string;
	PIN: string;
	type: MovementType.TRANSFERENCE;

	constructor(transference: TransferenceCreate) {
		this.amount = transference.amount;
		this.cardId = transference.cardId;
		this.toCard = transference.toCard;
		this.concept = transference.concept;
		this.PIN = transference.PIN;
		this.type = MovementType.TRANSFERENCE;
	}

	static create(transference: TransferenceCreate): TransferenceCreate {
		return new TransferenceCreate(transference);
	}
}

export type MovementCreate = DepositCreate | TransferenceCreate;

export function MovementCreateCreator(
	movement: TransferenceCreateProps
): TransferenceCreate;
export function MovementCreateCreator(
	movement: DepositCreateProps
): DepositCreate;
export function MovementCreateCreator(
	movement: TransferenceCreateProps | DepositCreateProps
): MovementCreate {
	if (movement.type === MovementType.DEPOSIT) {
		return DepositCreate.create(movement);
	}

	return TransferenceCreate.create(movement);
}
