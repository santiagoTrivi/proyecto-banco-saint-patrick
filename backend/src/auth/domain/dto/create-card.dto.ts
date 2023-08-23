import { IsNotEmpty, Length, IsString } from 'class-validator';
import { ICard } from '../interface/ICard';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto implements ICard {

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
  @IsNotEmpty()
  client: any;

  refreshToken?: string;
}
