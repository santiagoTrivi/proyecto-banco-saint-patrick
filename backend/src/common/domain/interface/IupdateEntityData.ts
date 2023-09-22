import { IDataCipher } from './IDataCipher';

export interface UpdateEntityData<T> {
  update(clientId: string, dataToUpdata: T);
}
