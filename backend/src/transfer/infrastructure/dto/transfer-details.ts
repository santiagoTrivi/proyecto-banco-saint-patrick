import { ApiProperty } from '@nestjs/swagger';
import { ITransfer } from '../../domain/interface/Itransfer';

export class TransferDetails implements ITransfer {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  senderId: {
    card_number: string;
    isActive: boolean;
  };

  @ApiProperty()
  receiverId: {
    card_number: string;
    isActive: boolean;
  };

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
