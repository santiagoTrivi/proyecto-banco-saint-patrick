import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientService } from '../../../client/infrastructure/services/client.service';
import { DataCipher } from '../../../common/useCase/dataCipher';
import { CONFIG_JWT_TIMING } from '../../../config/jwt.cofig';
import { IAuthentication } from '../../domain/interface/IAuthentication';

@Injectable()
export class AuthService {
  private dataCipher: DataCipher;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly clientService: ClientService,
  ) {
    this.dataCipher = new DataCipher();
  }

  async validateClient(username: string, password: string): Promise<any> {
    const client = await this.clientService.findOne({ username });

    if (!client) return null;

    const PASSWORD_VALIDATION = await this.dataCipher.compare(
      password,
      client.password,
    );

    if (!PASSWORD_VALIDATION) return null;

    return client;
  }

  async login(client: any) {
    const tokens = await this.getTokens(client._id, client.username);

    await this.updateRefreshToken(client._id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(id: string, username: string) {
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
      refreshExpireIn: CONFIG_JWT_TIMING.refresh_token_expireIn
    } as IAuthentication

  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedRefresh = await this.dataCipher.hash(refreshToken);

    await this.clientService.update(id, {
      refreshToken: hashedRefresh,
    });


  }

  async refreshTokens(clientId: string, refreshTokenInput: string) {
    const client = await this.clientService.findOne({ _id: clientId });

    if (!client || !client.refreshToken)
      throw new ForbiddenException('Access Denied');

    const { refreshToken } = client

    const refreshTokenValidation = await this.dataCipher.compare( refreshTokenInput, refreshToken);

    if (!refreshTokenValidation) throw new ForbiddenException('Access Denied');

    const { _id, username } = client;

    const {refresh_token, refreshExpireIn, ...access_token} = await this.getTokens(_id, username);

    //await this.updateRefreshToken(_id, client.refreshToken);

    return access_token
  }

  async logout(id: string) {
    await this.clientService.update(id, { refreshToken: null });
  }
}
