import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto } from "../domain/dto/login-dto";
import { AuthService } from "../auth.service";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class LoginUseCase{
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ){}

    run = async(loginDto: LoginDto) => {

        const card  = await this.authService.findByCardNumber(loginDto.card_number);

        if(!card) throw new HttpException('CARD_NOT_FOUND', HttpStatus.NOT_FOUND);

        const PIN_VALIDATION = compareSync(loginDto.PIN, card.PIN);

        if(!PIN_VALIDATION) throw new HttpException('CARD NUMBER AND PIN INCORRECT', HttpStatus.UNAUTHORIZED);

        const { PIN, ...authCard} = card;

        const payload = { id: card._id, card_number: card.card_number}

        const token = this.jwtService.signAsync(payload);

        return token;
    }
}