import { Injectable } from '@nestjs/common';
import { CreateClientDto } from '../Dto/create-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from '../schemas/client.schema';
import { UdpateClientDto } from '../Dto/update-client.dto';
import { ClientRepository } from '../../../../src/client/domain/interface/IClientRepository';
import { ClientEntity } from 'src/client/domain/client.entity';


@Injectable()
export class ClientService implements ClientRepository {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = new this.clientModel(createClientDto);
    return await client.save();
  }

  findOneByUsername(username: string):Promise<ClientEntity> {
    return this.clientModel.findOne({ username });
  }

  async findAll(): Promise<ClientEntity[]> {
    return await this.clientModel.find().select({
      __v: 0,
    });
  }

  async update(id: string, updateClientDto: UdpateClientDto) {
    const { cards } = updateClientDto;
    return await this.clientModel
      .findByIdAndUpdate(id, updateClientDto, { new: true })
      .exec();
  }

  async findOne(query: any): Promise<ClientEntity> {
    const client = await this.clientModel
      .findOne(query)
      .select({ __v: 0 })
      .populate({ path: 'cards', select: { __v: 0 } });

    if (!client) return null;

    return client.toObject();
  }
}

