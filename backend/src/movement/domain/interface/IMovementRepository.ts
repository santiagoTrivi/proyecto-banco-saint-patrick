import { IPaginationOption } from '../../../common/domain/interface/IpaginationOpstions';

export interface IMovementRepository {
  geMovement(query: any);
  getMovements();
  getMovementHistory(cardId: string, opction: IPaginationOption);
}
