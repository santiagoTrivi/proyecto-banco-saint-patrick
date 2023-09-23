import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthentication } from '../../domain/interface/IAuthentication';
import { AuthRepository } from '../../domain/interface/IAuthRepository';
import { DataCipher } from '@common/useCase/dataCipher';
import { ClientService } from '@client/infrastructure/services/client.service';
import { CONFIG_JWT_TIMING } from '@config/jwt.cofig';
import { ClientEntity } from '@client/domain/client.entity';

@Injectable()
export class AuthService implements AuthRepository {
  private dataCipher: DataCipher;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly clientService: ClientService,
  ) {
    this.dataCipher = new DataCipher();
  }

  async validateClient(username: string, password: string) {
    const client = await this.clientService.findOne({ username });

    if (!client) return null;

    const PASSWORD_VALIDATION = await this.dataCipher.compare(
      password,
      client.password,
    );

    if (!PASSWORD_VALIDATION) return null;

    return client;
  }

  async login(client: ClientEntity): Promise<IAuthentication> {
    const { _id, username } = client;

    const tokens = await this.getTokens(_id, username);

    await this.updateRefreshToken(_id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(id: string, username: string): Promise<IAuthentication> {
    const payload = {
      uuid: id,
      username,
    };

    const access_token = await this.jwtService.sign(payload);

    const refresh_token = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_KEY'),
      expiresIn: CONFIG_JWT_TIMING.refresh_token_expireIn,
    });

    return {
      expireIn: CONFIG_JWT_TIMING.access_token_expireIn,
      access_token,
      refresh_token,
      refreshExpireIn: CONFIG_JWT_TIMING.refresh_token_expireIn,
    } as IAuthentication;
  }

  async updateRefreshToken(
    id: string,
    refreshTokenInput: string,
  ): Promise<void> {
    const hashedRefresh = await this.dataCipher.hash(refreshTokenInput);

    await this.clientService.update(id, {
      refreshToken: hashedRefresh,
    });
  }

  async refreshTokens(
    clientId: string,
    refreshTokenInput: string,
  ): Promise<IAuthentication> {
    const client = await this.clientService.findOne({ _id: clientId });

    if (!client || !client.refreshToken)
      throw new ForbiddenException('Access Denied');

    const { refreshToken } = client;

    const refreshTokenValidation = await this.dataCipher.compare(
      refreshTokenInput,
      refreshToken,
    );

    if (!refreshTokenValidation) throw new ForbiddenException('Access Denied');

    const { _id, username } = client;

    const tokens = await this.getTokens(_id, username);

    await this.updateRefreshToken(_id, tokens.refresh_token);

    return tokens;
  }

  async logout(id: string): Promise<void> {
    await this.clientService.update(id, { refreshToken: null });
  }
}
