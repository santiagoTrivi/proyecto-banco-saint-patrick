import { ClientEntity } from '../../../../src/client/domain/client.entity';
import { IClient } from '../../../../src/client/domain/interface/IClient';
import {
  Client,
  ClientDocument,
} from '../../../../src/client/infrastructure/schemas/client.schema';

export const clientStub = (): ClientEntity => {
  return {
    _id: '64f3fda19c921da520268dc9',
    firstName: 'tom',
    lastName: 'maxwell',
    username: 'tommaxwell',
    password: '$2b$10$cEWfvps9A2ottJ1Sd2HUPOeTd1H02rSFTMtPeYMEKfjvT/35wtoim',
    cards: [],
    isActive: true,
    refreshToken: null,
  };
};


export const newClient = () => {
  return {
    firstName: "test0",
    lastName: "test0",
    username: "test0Username",
    password: "test0Username"
  }
}