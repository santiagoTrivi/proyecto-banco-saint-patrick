import { DataCipher } from '@common/useCase/dataCipher';
import { IDataCipher } from '@common/domain/interface/IDataCipher';
import { ClientEntity } from '../domain/client.entity';
import { IUpdateClient } from '../domain/interface/IUpdateClient';
import { ClientService } from '../infrastructure/services/client.service';
import { UpdateEntityData } from '@common/domain/interface/IupdateEntityData';
import { ValidateObjectIdService } from '@common/infrastructure/service/validMongoObjectId';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UpdateClientInfo implements UpdateEntityData<IUpdateClient> {
  private dataCipher: IDataCipher;
  private validateObjectIdService: ValidateObjectIdService;

  constructor(private readonly clientService: ClientService) {
    this.dataCipher = new DataCipher();
    this.validateObjectIdService = new ValidateObjectIdService();
  }

  update = async (id: string, dataToUpdata: IUpdateClient) => {
    await this.validateObjectIdService.validate(id);
    const dataClientToUpdate: Partial<ClientEntity> = {};
    const client = await this.clientService.findById(id);

    try {
      if (!client) {
        throw new NotFoundException('CLIENT_NOT_FOUND');
      }
      const _clientId = client._id;

      if (dataToUpdata.newPassword) {
        dataClientToUpdate.password = await this.changePassword(
          dataToUpdata,
          client,
        );
      }

      dataClientToUpdate.updatedAt = new Date();
      await this.clientService.update(_clientId, dataClientToUpdate);
    } catch (error) {
      throw error;
    }
  };

  private changePassword = async (
    dataToUpdata: IUpdateClient,
    clientEntity: ClientEntity,
  ): Promise<string> => {
    const { currentPassword, newPassword, confirmPassword } = dataToUpdata;

    if (newPassword !== confirmPassword) {
      throw new UnauthorizedException('PASSWORD_NOT_CONFIRMED');
    }
    const currentHashedPassword = clientEntity.password;

    const IS_THE_SANE_PASSOWRD = await this.dataCipher.compare(
      currentPassword,
      currentHashedPassword,
    );

    if (!IS_THE_SANE_PASSOWRD) {
      throw new UnauthorizedException('INCORRECT_PASSWORD');
    }

    return await this.dataCipher.hash(newPassword);
  };
}
