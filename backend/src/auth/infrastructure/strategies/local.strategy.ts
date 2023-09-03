import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {

    const client = this.authService.validateClient(username, password);
    
    if(!client) throw new UnauthorizedException('WORNG USERNAME OR PASSWORD');

    return client;

    /*
    const card = await this.authService.validateCard(card_number, PIN);
    if (!card) {
      throw new UnauthorizedException('WORNG CARD_NUMBER OR PIN');
    }

    return card;
    */
  }
}
