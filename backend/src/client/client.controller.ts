import { Body, Controller, Post, Put, UseGuards, Request, Param } from "@nestjs/common";
import { ClientService } from "./infrastructure/services/client.service";
import { ApiTags } from "@nestjs/swagger";
import { UdpateClientDto } from "./infrastructure/Dto/update-client.dto";
import { AddCardProcess } from "./useCase/addCardProcess";
import { CreateCardDto } from "../card/infrastructure/Dto/create-card.dto";
import { JwtAuthGuard } from "../auth/infrastructure/guards";

@ApiTags()
@Controller('client')
export class ClientController{
    constructor(
        private readonly clientService: ClientService,
        private readonly addCardProcess: AddCardProcess
        ){}

    @UseGuards(JwtAuthGuard)
    @Put('update')
    async update(@Request() req, @Body() updateClientDto: UdpateClientDto){
        const {password} = updateClientDto;
        //await this.clientService.update(req.user.uuid, password)
        return updateClientDto;
    }

    @Post('card/:clientId')
    async addCard(@Param('clientId') clientId, @Body() createCardDto: CreateCardDto){
        const { PIN } = createCardDto;
        await this.addCardProcess.run(clientId, PIN);
    }
}