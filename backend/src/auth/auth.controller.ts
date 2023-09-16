import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpCode,
  Body,
} from '@nestjs/common';
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
import {
  ForbiddenErrorResponseChema,
  InternalServerErrorSchema,
  NotFoundErrorResponseSchema,
  UnauthorizedResponseSchema,
} from '../common/infrastructure/errors.schemas';
import { AuthService } from './infrastructure/services/auth.service';
import {
  JwtAuthGuard,
  LocalAuthGuard,
  RefreshJwtGuard,
} from './infrastructure/guards';
import {
  AuthenticationTokens,
  LoginDto,
  RefreshToken,
} from './infrastructure/dto/';
import { GetClientInfo } from './useCase/getClientInfo';
import { CreateClientDto } from '../client/infrastructure/Dto/create-client.dto';
import { RegisterClient } from './useCase/registerClient';
import { ClientEntity } from '../../src/client/domain/client.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly getClientInfo: GetClientInfo,
    private readonly registerClient: RegisterClient,
  ) {}

  @ApiOkResponse({ type: AuthenticationTokens })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'User login',
    description:
      'With this endpoint, the user can login providing their username number and their password, which is encrypted in the database',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return await this.authService.login(req.client);
  }

  @Post('client')
  async register(@Body() createClientDto: CreateClientDto){
    const {firstName, lastName, username, password} = createClientDto
    const client = new ClientEntity(undefined, firstName, lastName, username, password)
  
    return await this.registerClient.run(client);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateClientDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiNotFoundResponse({ type: NotFoundErrorResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Get full authenticated client info',
    description:
      'With this endpoint, the user coud retrive their information once they login',
  })
  @UseGuards(JwtAuthGuard)
  @Get('clientInfo')
  async getclient(@Request() req) {
    return await this.getClientInfo.run(req.user.uuid);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: RefreshToken })
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
