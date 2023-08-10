import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateClientDto } from './domain/dto/create-client.dto';
import { UpdateAuthDto } from './domain/dto/update-auth.dto';
import { ClientService } from './client.service';
import { CreateCardDto } from './domain/dto/create-card.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './domain/dto/login-dto';
import { LoginUseCase } from './use-case/login-useCase';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly clientService: ClientService,
    private readonly loginUseCase: LoginUseCase
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
    return this.authService.create(CreateCardDto);
  }

  @Get('card')
  findAllCardd() {
    return this.authService.findAll()
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto){ 
    const access_token = await this.loginUseCase.run(loginDto)
    

    return {
      access_token
    }
  }
}
