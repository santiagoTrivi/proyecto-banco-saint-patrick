import { IsNotEmpty, Length } from 'class-validator';
import { CreateCard } from '../../../card/domain/interface/ICreateCard';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto implements CreateCard {
  @ApiProperty()
  @IsNotEmpty()
  @Length(4, 4)
  PIN: string;

  @ApiProperty()
  @IsNotEmpty()
  currencyId: string;
}
