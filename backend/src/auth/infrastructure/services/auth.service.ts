import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientService } from '../../../client/infrastructure/services/client.service';
import { DataCipher } from '../../../common/useCase/dataCipher';

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
      expiresIn: '7d',
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashedRefresh = await this.dataCipher.hash(refreshToken);

    await this.clientService.update(id, {
      refreshToken: hashedRefresh,
    });
  }

  async refreshTokens(clientId: string, refreshToken: string) {
    const client = await this.clientService.findOne({ _id: clientId });

    if (!client || !client.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenValidation = await this.dataCipher.compare(
      refreshToken,
      client.refreshToken,
    );

    if (!refreshTokenValidation) throw new ForbiddenException('Access Denied');

    const { _id, username } = client;

    const tokens = await this.getTokens(_id, username);

    await this.updateRefreshToken(_id, client.refreshToken);

    return tokens;
  }

  async logout(id: string) {
    await this.clientService.update(id, { refreshToken: null });
  }
}
