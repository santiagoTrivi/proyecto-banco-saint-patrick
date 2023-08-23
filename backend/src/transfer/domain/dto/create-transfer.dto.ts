import { IsNotEmpty, IsNumber } from 'class-validator';
import { ITransfer } from '../interface/Itransfer';

export class CreateTransferDto implements ITransfer {
  @IsNotEmpty()
  sender: any;

  @IsNotEmpty()
  receiver: any;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
