import { ClientEntity } from '../client.entity';

export interface ClientRepository {
  findOneByUsername(username: string): Promise<ClientEntity>;
  findOne(query: any): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
}
