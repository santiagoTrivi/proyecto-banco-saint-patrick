import { ApiProperty } from '@nestjs/swagger';
import { CreateMovementDto } from './create-movement.dto';
import { CurrencyObjectData } from '../../../currency/infrastructure/Dto/create-currency.dto';

export class DetailedMovement extends CreateMovementDto {
  @ApiProperty()
  currencyId: CurrencyObjectData;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class HistoryMovementDto {
  @ApiProperty({
    type: DetailedMovement,
    isArray: true,
  })
  data: DetailedMovement[];

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  from: Date;

  @ApiProperty()
  until: Date;
}
