import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';
import { IUpdateCard } from '../../domain/interface/IUpdateCard';

export class UdpateCardDto implements IUpdateCard {

  @ApiProperty()
  @IsOptional()
  @Length(4, 4)
  currentPIN?: string;

  @ApiProperty()
  @IsOptional()
  @Length(4, 4)
  newPIN?: string;

  @ApiProperty()
  @IsOptional()
  @Length(4, 4)
  confirmPIN?: string;
}
