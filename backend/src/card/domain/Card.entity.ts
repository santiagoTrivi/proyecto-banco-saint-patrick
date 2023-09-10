import { ICard } from "./interface/ICard";

export class CardEntity implements ICard {
    constructor(
        public _id: string,
        public card_number: string,
        public PIN: string,
        public current_balance: number,
        public isActive?: boolean,
    ){}
}