import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CardService } from './services/card.service';
import { CreateClientDto } from './domain/dto/create-client.dto';
import { ClientService } from './services/client.service';
import { CreateCardDto } from './domain/dto/create-card.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { GetCardInfo } from './useCase/getCardInfo';
import { RefreshJwtGuard } from './guards/refresh.jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly cardService: CardService,
    private readonly clientService: ClientService,
    private readonly authService: AuthService,
    private readonly getCardInfo: GetCardInfo,
  ) {}

  @ApiOperation({ description: 'Get all the clients' })
  @Get('client')
  findAll() {
    return this.clientService.findAll();
  }

  @ApiOperation({ description: 'Get all the cards' })
  @Get('cards')
  findAllCardd() {
    return this.cardService.findAll();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.card);
  }

  @UseGuards(JwtAuthGuard)
  @Get('card')
  async getcard(@Request() req) {
    return await this.getCardInfo.run(req.user.uuid);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh-tokens')
  async refreshTokens(@Request() req) {
    const [id, refresh_token] = [req.user.uuid, req.user.refreshToken];

    return await this.authService.refreshTokens(id, refresh_token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.uuid);
  }
}
