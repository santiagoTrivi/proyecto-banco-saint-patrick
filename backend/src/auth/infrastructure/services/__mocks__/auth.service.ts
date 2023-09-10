import { AuthenticationStub, clientStub } from '../../../../../test/unit/stub';

export const AuthService = jest.fn().mockReturnValue({
  validateClient: jest.fn().mockReturnValue(clientStub()),
  login: jest.fn().mockReturnValue(AuthenticationStub()),
  refreshTokens: jest.fn().mockReturnValue(AuthenticationStub()),
});
