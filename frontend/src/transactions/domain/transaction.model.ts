export interface Transaction {
	id: string;
	clientId: string;
	senderId: string;
	receiverId: string;
	amount: number;
	currency: string;
	concept: string;
	createdAt: Date;
	updatedAt: Date;
}
