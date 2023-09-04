import { IsNotEmpty, Length, IsString } from 'class-validator';
import { ICard } from '../../../card/domain/interface/ICard';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto implements ICard {
  @ApiProperty()
  _id?: string;

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
  isActive?: boolean;

  refreshToken?: string;
}
