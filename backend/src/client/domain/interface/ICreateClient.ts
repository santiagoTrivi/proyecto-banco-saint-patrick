import { IClient } from './IClient';

export type ICreateClient = Omit<
  IClient,
  '_id' | 'createdAt' | 'updatedAt' | 'cards' | 'isActive' | 'refreshToken'
>;
