import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from '../schemas/client.schema';
import { UdpateClientDto } from '../Dto/update-client.dto';
import { ClientRepository } from '../../domain/interface/IClientRepository';
import { ClientEntity } from '../../domain/client.entity';

@Injectable()
export class ClientService implements ClientRepository {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}
  async create(createClient: ClientEntity): Promise<ClientEntity> {
    const client = new this.clientModel(createClient);
    const savedClient = await client.save();
    return ClientEntity.getClientEntity(savedClient);
  }

  async findById(clientId: string): Promise<ClientEntity> {
    return await this.clientModel.findById(clientId);
  }

  findOneByUsername(username: string): Promise<ClientEntity> {
    return this.clientModel.findOne({ username });
  }

  async findAll(): Promise<ClientEntity[]> {
    return await this.clientModel.find().select({
      __v: 0,
    });
  }

  async update(id: string, updateData: Partial<ClientEntity>) {
    return await this.clientModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async findOne(query: any): Promise<ClientEntity> {
    const client = await this.clientModel
      .findOne(query)
      .select({ __v: 0 })
      .populate({ path: 'cards', select: { __v: 0 } })
      .lean()
      .exec();

    if (!client) return null;

    return ClientEntity.getClientEntity(client);
  }

  async addCard(id: string, card: string) {
    return await this.clientModel.findByIdAndUpdate(
      id,
      { $push: { cards: card } },
      { new: true },
    );
  }
}
