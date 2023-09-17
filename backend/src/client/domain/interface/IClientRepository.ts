import { ClientEntity } from '../client.entity';

export interface ClientRepository {
  create(createClient: ClientEntity): Promise<ClientEntity>
  findOneByUsername(username: string): Promise<ClientEntity>;
  findById(clientId: string): Promise<ClientEntity>;
  findOne(query: any): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
  update(id: string, updateData: Partial<ClientEntity>)
  addCard(id: string, card: string)
}
