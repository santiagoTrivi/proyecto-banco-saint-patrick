import { clientStub } from '../../../../test/unit/client/stub';

export const GetClientInfo = jest.fn().mockReturnValue({
  run: jest.fn().mockReturnValue(clientStub),
});
