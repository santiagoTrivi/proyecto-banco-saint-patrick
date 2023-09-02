import { Controller, Get } from '@nestjs/common';
import { ClientService } from './infrastructure/services/client.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateClientDto } from './infrastructure/Dto/create-client.dto';

@Controller('client')
export class ClientController {
    constructor(
        private readonly clientService:ClientService
    ){}

    @ApiOkResponse({ type: CreateClientDto, isArray: true })
    @ApiOperation({
      summary: 'Get all clients',
      description: 'Get all the clients registered in the chosen database',
    })

    @Get('client')
    findAll() {
      return this.clientService.findAll();
    }

    
}
