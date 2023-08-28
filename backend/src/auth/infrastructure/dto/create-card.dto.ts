import { IsNotEmpty, Length, IsString } from 'class-validator';
import { ICard } from '../../domain/interface/ICard';
import { ApiProperty } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

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

  @ApiProperty()
  @IsNotEmpty()
  client: CreateClientDto;

  refreshToken?: string;
}
