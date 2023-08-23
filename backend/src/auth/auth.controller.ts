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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { GetCardInfo } from './useCase/getCardInfo';
import { RefreshJwtGuard } from './guards/refresh.jwt.guard';
import { LoginDto } from './domain/dto/login-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly cardService: CardService,
    private readonly clientService: ClientService,
    private readonly authService: AuthService,
    private readonly getCardInfo: GetCardInfo,
  ) {}

  @ApiOperation({ 
    summary: 'Get all clients',
    description: 'Get all the clients registered in the chosen database' 
  })
  @Get('client')
  findAll() {
    return this.clientService.findAll();
  }

  @ApiOperation({ 
    summary: 'Get all the cards',
    description: 'Get all the cards registered in the chosen database' })
  @Get('cards')
  findAllCardd() {
    return this.cardService.findAll();
  }

  @ApiOperation({ 
    summary: 'User login',
    description: 'With this endpoint, the user can login providing their card number and its PIN, which is encrypted in the database' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({type: LoginDto})
  async login(@Request() req) {
    return await this.authService.login(req.card);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get full authenticated card info',
    description: 'With this endpoint, the user coud retrive their card information once they login' })
  @UseGuards(JwtAuthGuard)
  @Get('card')
  async getcard(@Request() req) {
    return await this.getCardInfo.run(req.user.uuid);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Refresh access_token',
    description: 'to obtain additional access tokens. This allows you to have short-lived access tokens without having to collect credentials every time one expires' })
  @UseGuards(RefreshJwtGuard)
  @Post('refresh-tokens')
  async refreshTokens(@Request() req) {
    const [id, refresh_token] = [req.user.uuid, req.user.refreshToken];

    return await this.authService.refreshTokens(id, refresh_token);
  }

  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Logout implementation',
    description: 'log a user out of the session and invalite the refresh token' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.uuid);
  }
}
