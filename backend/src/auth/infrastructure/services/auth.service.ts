import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { compare, compareSync, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CardService } from './card.service';
import { LoginDto } from '../dto/login-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly cardService: CardService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateCard(card_number: string, PIN: string): Promise<any> {
    const card = await this.cardService.findOne({ card_number });

    if (!card) throw new HttpException('CARD_NOT_FOUND', HttpStatus.NOT_FOUND);

    const PIN_VALIDATION = compareSync(PIN, card.PIN);

    if (!PIN_VALIDATION)
      throw new HttpException(
        'CARD NUMBER AND PIN INCORRECT',
        HttpStatus.UNAUTHORIZED,
      );

    return card;
  }

  async login(card: any) {
    const tokens = await this.getTokens(card._id, card.card_number);

    await this.updateRefreshToken(card._id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(cardId: string, card_number: string) {
    const payload = {
      uuid: cardId,
      card_number,
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
    const hashedRefresh = await hash(refreshToken, 10);

    await this.cardService.update(id, {
      refreshToken: hashedRefresh,
    });
  }

  async refreshTokens(cardId: string, refreshToken: string) {
    const card = await this.cardService.findOne({ _id: cardId });

    if (!card || !card.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenValidation = await compare(
      refreshToken,
      card.refreshToken,
    );

    if (!refreshTokenValidation) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(card._id, card.card_number);

    await this.updateRefreshToken(card._id, tokens.refresh_token);

    return tokens;
  }

  async logout(cardId: string) {
    await this.cardService.update(cardId, { refreshToken: null });
  }
}
