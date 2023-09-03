import { Injectable } from '@nestjs/common';
import { CreateClientDto } from '../Dto/create-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from '../schemas/client.schema';
import { UdpateClientDto } from '../Dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = new this.clientModel(createClientDto)
    return await client.save()
  }

  findOneByUsername(username: string){
    return this.clientModel.findOne({username});
  }

  async findAll() {
    return await this.clientModel.find().select({
      __v: 0,
    });
  }

  async update(id: string, updateClientDto: UdpateClientDto){
    const {cards} = updateClientDto
    return await this.clientModel
    .findByIdAndUpdate(id, updateClientDto, {new: true})
    .exec();
  }

  async findOne(query: any) {
    const client = await this.clientModel
      .findOne(query)
      .select({ __v: 0 });

    if (!client) return null;

    return client.toObject();
  }
}
