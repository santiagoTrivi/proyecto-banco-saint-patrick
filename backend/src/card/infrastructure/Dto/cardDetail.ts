import { IsNotEmpty, Length, IsString, IsOptional } from 'class-validator';
import { ICard } from '../../domain/interface/ICard';
import { ApiProperty } from '@nestjs/swagger';
import { CurrencyObjectData } from '../../../currency/infrastructure/Dto/create-currency.dto';

export class CardDetail implements ICard {
  @ApiProperty()
  _id?: string;

  @ApiProperty()
  clientId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(16)
  card_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  PIN: string;

  @ApiProperty()
  @IsNotEmpty()
  current_balance: number;

  @ApiProperty()
  currency?: CurrencyObjectData;

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date;
}
