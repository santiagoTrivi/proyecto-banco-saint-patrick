import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CardService } from './services/card.service';
import { CreateClientDto } from './domain/dto/create-client.dto';
import { ClientService } from './services/client.service';
import { CreateCardDto } from './domain/dto/create-card.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local.auth.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly cardService: CardService,
    private readonly clientService: ClientService,
    private readonly authService: AuthService
    ) {}
  
  @ApiOperation({ description: 'Register a new client' })
  @ApiBody({type: CreateClientDto})
  @Post('client')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.register(createClientDto);
  }

  @ApiOperation({ description: 'Get all the clients' })
  @Get('client')
  findAll() {
    return this.clientService.findAll();
  }

  @Post('card')
  register(@Body() CreateCardDto: CreateCardDto){
    return this.cardService.create(CreateCardDto);
  }

  @Get('cards')
  findAllCardd() {
    return this.cardService.findAll()
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req){ 
    return await this.authService.login(req.card);
  }

  @UseGuards(JwtAuthGuard)
  @Get('card')
  async getcard(@Request() req){
    console.log(req.user)
  }
}


