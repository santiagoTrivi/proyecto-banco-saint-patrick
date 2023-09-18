import { CardEntity } from '../../../src/card/domain/Card.entity';
import { IClient } from './interface/IClient';

export class ClientEntity implements IClient {
  constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public password?: string,
    public isActive?: boolean,
    public cards?: CardEntity[],
    public refreshToken?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static getClientEntity(result: any): ClientEntity {
    const {
      _id,
      firstName,
      lastName,
      username,
      password,
      isActive,
      cards,
      refreshToken,
      createdAt,
      updatedAt,
    } = result;

    return new ClientEntity(
      _id,
      firstName,
      lastName,
      username,
      password,
      isActive,
      cards,
      refreshToken,
      createdAt,
      updatedAt,
    );
  }
}
