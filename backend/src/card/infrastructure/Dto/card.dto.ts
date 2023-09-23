import { IsNotEmpty, Length, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICard } from '@card/domain/interface/ICard';

export class CardDto implements ICard {
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
  currency?: string;

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date;
}
