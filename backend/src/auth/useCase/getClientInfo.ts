import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientService } from '../../client/infrastructure/services/client.service';

@Injectable()
export class GetClientInfo {
  constructor(private readonly clientService: ClientService) {}

  run = async (_id: string) => {
    const client = await this.clientService.findOne({ _id });

    if (!client) throw new NotFoundException('CLIENT_NOT_FOUND');

    const { password, ...result } = client;

    return result;
  };
}
