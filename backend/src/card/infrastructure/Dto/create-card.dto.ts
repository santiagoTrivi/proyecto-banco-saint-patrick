import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCard } from '@card/domain/interface/ICreateCard';

export class CreateCardDto implements CreateCard {
  @ApiProperty()
  @IsNotEmpty()
  @Length(4, 4)
  PIN: string;

  @ApiProperty()
  @IsNotEmpty()
  currencyId: string;
}
