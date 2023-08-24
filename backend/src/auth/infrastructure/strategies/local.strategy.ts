import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'card_number',
      passwordField: 'PIN',
    });
  }

  async validate(card_number: string, PIN: string) {
    const card = await this.authService.validateCard(card_number, PIN);
    if (!card) {
      throw new UnauthorizedException();
    }

    return card;
  }
}
