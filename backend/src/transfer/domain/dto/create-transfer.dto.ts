import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ICreateTransferDTO } from '../interface/ICreateTransferDTO';
import { ApiProperty } from '@nestjs/swagger';


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
