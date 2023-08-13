import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CardService } from './card.service';
import { LoginDto } from '../domain/dto/login-dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly cardService: CardService, 
        private jwtService: JwtService
        ) { }

    async validateCard(card_number: string, PIN: string): Promise<any> {

        const card = await this.cardService.findOne({card_number})

        if(!card) throw new HttpException('CARD_NOT_FOUND', HttpStatus.NOT_FOUND);

        const PIN_VALIDATION = compareSync(PIN, card.PIN);

        if(!PIN_VALIDATION) throw new HttpException('CARD NUMBER AND PIN INCORRECT', HttpStatus.UNAUTHORIZED);

        return card;
    }

    async login(card: any) {
        const payload = { card_number: card.card_number, uuid: card._id };

        return {
            access_token: await this.jwtService.sign(payload),
            refresh_token: await this.jwtService.sign(payload, {expiresIn: '3d'})
        };
    }
}