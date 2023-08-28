import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { CardService } from './infrastructure/services/card.service';
import { ClientService } from './infrastructure/services/client.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './infrastructure/services/auth.service';
import { LocalAuthGuard } from './infrastructure/guards/local.auth.guard';
import { GetCardInfo } from './useCase/getCardInfo';
import { RefreshJwtGuard } from './infrastructure/guards/refresh.jwt.guard';
import { AuthenticationTokens, LoginDto } from './infrastructure/dto/login-dto';
import { CreateCardDto } from './infrastructure/dto/create-card.dto';
import { CreateClientDto } from './infrastructure/dto/create-client.dto';
import { JwtAuthGuard } from './infrastructure/guards/jwt.guard';
import {
  ForbiddenErrorResponseChema,
  InternalServerErrorSchema,
  NotFoundErrorResponseSchema,
  UnauthorizedResponseSchema,
} from '../common/infrastructure/errors.schemas';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly cardService: CardService,
    private readonly clientService: ClientService,
    private readonly authService: AuthService,
    private readonly getCardInfo: GetCardInfo,
  ) {}

  @ApiOkResponse({ type: CreateClientDto, isArray: true })
  @ApiOperation({
    summary: 'Get all clients',
    description: 'Get all the clients registered in the chosen database',
  })
  @Get('client')
  findAll() {
    return this.clientService.findAll();
  }

  @ApiOkResponse({ type: CreateCardDto, isArray: true })
  @ApiOperation({
    summary: 'Get all the cards',
    description: 'Get all the cards registered in the chosen database',
  })
  @Get('cards')
  findAllCardd() {
    return this.cardService.findAll();
  }

  @ApiOkResponse({ type: AuthenticationTokens })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'User login',
    description:
      'With this endpoint, the user can login providing their card number and its PIN, which is encrypted in the database',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return await this.authService.login(req.card);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateCardDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiNotFoundResponse({ type: NotFoundErrorResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Get full authenticated card info',
    description:
      'With this endpoint, the user coud retrive their card information once they login',
  })
  @UseGuards(JwtAuthGuard)
  @Get('card')
  async getcard(@Request() req) {
    return await this.getCardInfo.run(req.user.uuid);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthenticationTokens })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiForbiddenResponse({ type: ForbiddenErrorResponseChema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Refresh access_token',
    description:
      'to obtain additional access tokens. This allows you to have short-lived access tokens without having to collect credentials every time one expires',
  })
  @UseGuards(RefreshJwtGuard)
  @Post('refresh-tokens')
  async refreshTokens(@Request() req) {
    const [id, refresh_token] = [req.user.uuid, req.user.refreshToken];

    return await this.authService.refreshTokens(id, refresh_token);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'logged out successfully' })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Logout implementation',
    description: 'log a user out of the session and invalite the refresh token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.uuid);
  }
}
