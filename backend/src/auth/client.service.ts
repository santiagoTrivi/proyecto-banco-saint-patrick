import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Client, ClientDocument } from "./schemas/client.schema";
import { Model } from "mongoose";

@Injectable()
export class ClientService{

    constructor(
        @InjectModel(Client.name)
        private readonly clientModel: Model<ClientDocument>
    ){}

    async register(createClientDto: CreateClientDto){
        const client = new Client();

        client.firstName = createClientDto.firstName;
        client.lastName = createClientDto.lastName;

        return await this.clientModel.create(client);
    }

    async findAll(){
        
        return await this.clientModel
        .find()
        .select({
            __v: 0
        })

    }
}