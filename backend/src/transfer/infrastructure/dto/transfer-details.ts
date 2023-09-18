import { ApiProperty } from '@nestjs/swagger';
import { ITransfer } from '../../domain/interface/Itransfer';

class CardDetail {
  @ApiProperty()
  card_number: string;

  @ApiProperty()
  isActive: boolean;
}

export class TransferDetails implements ITransfer {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  senderId: CardDetail;

  @ApiProperty()
  receiverId: CardDetail;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  concept: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
