import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ICreateTransferDTO } from '../../domain/interface/ICreateTransferDTO';
import { ApiProperty } from '@nestjs/swagger';
import { ITransfer } from '../../domain/interface/Itransfer';


export class CreateTransferDto implements ICreateTransferDTO {
  
  @ApiProperty()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty()
  @IsNotEmpty()
  receiver: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  concept: string;

}

export class TransferObject implements ITransfer{

  @ApiProperty()
  _id: string;

  @ApiProperty()
  senderId: string;

  @ApiProperty()
  receiverId: string;

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
