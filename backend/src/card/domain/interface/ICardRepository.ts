import { CardEntity } from '../Card.entity';

export interface CardRepository {
  create(createCard: CardEntity): Promise<CardEntity>;
  findAll(): Promise<CardEntity[]>;
  findOne(query: any): Promise<CardEntity>;
  findById(id: string): Promise<CardEntity>;
  update(id: string, updateData: Partial<CardEntity>);
}
