import { Body, Controller, Put } from "@nestjs/common";
import { ClientService } from "./infrastructure/services/client.service";
import { ApiTags } from "@nestjs/swagger";
import { UdpateClientDto } from "./infrastructure/Dto/update-client.dto";

@ApiTags()
@Controller()
export class ClientController{
    constructor(clientService: ClientService){}

    @Put('update')
    async update(@Body() updateClientDto: UdpateClientDto){
        return updateClientDto;
    }
}