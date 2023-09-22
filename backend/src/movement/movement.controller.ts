import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMovementDto } from './infrastructure/Dto/create-movement.dto';
import { MovementDepositHandler } from './useCase/movementDepositHandler';
import { MainMovementHandler } from './useCase/mainMovementHandler';
import { GetMovementData } from './useCase/getMovementData';
import { IPaginationOption } from '../common/domain/interface/IpaginationOpstions';

@ApiTags('movement')
@Controller('movement')
export class MovementController {
  constructor(
    private readonly mainMovementHandler: MainMovementHandler,
    private readonly getMovementData: GetMovementData
    ) {}

  @Post()
  async create(@Body() createMovement: CreateMovementDto) {
    return await this.mainMovementHandler.execute(createMovement);
  }

  @Get(':cardId')
  async getPaginationmmovement(@Param('cardId') cardId: string, @Query() paginations: IPaginationOption){
    return this.getMovementData.PoaginationMovementByCard(cardId, paginations);
  }
}
