import { DataCipher } from '../../common/useCase/dataCipher'
import { IDataCipher } from '../../common/domain/interface/IDataCipher'
import { ClientEntity } from '../domain/client.entity'
import { IUpdateClient } from '../domain/interface/IUpdateClient'
import { ClientService } from '../infrastructure/services/client.service'
import { UpdateEntityData } from '../../common/domain/interface/IupdateEntityData'
import { ValidateObjectIdService } from '../../common/infrastructure/service/validMongoObjectId'
import { NotFoundException } from '@nestjs/common'


export class UpdateClientInfo implements UpdateEntityData<IUpdateClient>{

    private dataCipher: IDataCipher;
    private validateObjectIdService: ValidateObjectIdService;

    constructor(private readonly clientService: ClientService){
        this.dataCipher = new DataCipher();
        this.validateObjectIdService = new ValidateObjectIdService();
    }

    update = async (clientId: string, dataToUpdata: IUpdateClient) => {

        const dataClientToUpdate: Partial<ClientEntity> = {}
        const client = await this.authentication(clientId);

        if(dataToUpdata.password){

        }
        throw new Error('Method not implemented.')
    }

    private authentication = async (clientId: string): Promise<ClientEntity> => {
        await this.validateObjectIdService.validate(clientId);

        const client = await this.clientService.findById(clientId);

        if(!client){
            throw new NotFoundException('CLIENT_NOT_FOUND')
        }

        return client;
    }


    

    
}