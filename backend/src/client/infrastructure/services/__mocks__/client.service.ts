import { clientStub } from '../../../../../test/unit/client/stub';

export const ClientService = jest.fn().mockReturnValue({
  findOneByUsername: jest.fn().mockReturnValue(clientStub()),
  update: jest.fn().mockReturnValue(clientStub()),
  findOne: jest.fn().mockReturnValue(clientStub()),
});
