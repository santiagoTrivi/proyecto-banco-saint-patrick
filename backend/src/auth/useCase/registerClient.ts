import { DataCipher } from '../../../src/common/useCase/dataCipher';
import { ClientService } from '../../../src/client/infrastructure/services/client.service';
import { AuthService } from '../infrastructure/services/auth.service';
import { ClientEntity } from '../../../src/client/domain/client.entity';
import { IAuthentication } from '../domain/interface/IAuthentication';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateEntity } from '../../../src/common/domain/interface/ICreateEntity';

@Injectable()
export class RegisterClient implements CreateEntity<ClientEntity> {
  private dataCipher: DataCipher;
  constructor(
    private readonly clientService: ClientService,
    private readonly authService: AuthService,
  ) {
    this.dataCipher = new DataCipher();
  }

  run = async ({
    firstName,
    lastName,
    username,
    password,
  }: ClientEntity): Promise<IAuthentication> => {
    const IS_USERNAME_REGISTERED = await this.clientService.findOne({
      username,
    });

    if (IS_USERNAME_REGISTERED) {
      throw new BadRequestException('USERNAME_ALREADY_REGISTERED');
    }

    const hashedPassword = await this.dataCipher.hash(password);

    const client = new ClientEntity(
      undefined,
      firstName,
      lastName,
      username,
      hashedPassword,
    );

    const newClient = await this.clientService.create(client);

    return await this.authService.login(newClient);
  };
}
