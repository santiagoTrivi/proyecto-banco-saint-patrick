import { InjectModel } from '@nestjs/mongoose';
import { Movement, MovementDocument } from '../schema/movement.schema';
import { PaginationService } from '../../../common/infrastructure/service/pagination-service.service';
import { ClientSession, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IMovementRepository } from '../../../movement/domain/interface/IMovementRepository';
import { IPaginationOption } from '../../../common/domain/interface/IpaginationOpstions';
import { IMovement } from '../../../movement/domain/interface/IMovement';

@Injectable()
export class MovementService implements IMovementRepository {
  private paginationService: PaginationService<MovementDocument>;
  constructor(
    @InjectModel(Movement.name)
    private readonly movementModel: Model<MovementDocument>,
  ) {
    this.paginationService = new PaginationService(this.movementModel);
  }

  async create(createmovement: IMovement) {
    const movement = new this.movementModel(createmovement);
    return await movement.save();
  }

  async geMovement(query: any) {
    return;
  }
  getMovements() {
    throw new Error('Method not implemented.');
  }
  async getMovementHistory(cardId: string, opction: IPaginationOption) {
    const query = { $or: [{ cardId }, { toCardId: cardId }] };
    const populate = {
      path: 'currencyId',
      select: { __v: 0, createdAt: 0, updatedAt: 0 },
    };
    return await this.paginationService.paginate(query, opction, populate);
  }
}
