import { ClientEntity } from '@client/domain/client.entity';
import { IAuthentication } from './IAuthentication';

export interface AuthRepository {
  validateClient(username: string, password: string): Promise<ClientEntity>;
  login(client: ClientEntity): Promise<IAuthentication>;
  getTokens(id: string, username: string): Promise<IAuthentication>;
  updateRefreshToken(id: string, refreshTokenInput: string): Promise<void>;
  refreshTokens(
    clientId: string,
    refreshTokenInput: string,
  ): Promise<IAuthentication>;
  logout(id: string): Promise<void>;
}
