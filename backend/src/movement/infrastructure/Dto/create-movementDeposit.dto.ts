import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ICreateMovementDto } from '../../domain/interface/ICreateMovementDto';
import { MovementType } from '../../domain/movementType';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovementDepositDto implements ICreateMovementDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cardId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  concept: string;

  @ApiProperty({ default: MovementType.DEPOSIT })
  @IsNotEmpty()
  @IsEnum(MovementType)
  type: MovementType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  PIN: string;
}

export class createdMovementDepositDto extends CreateMovementDepositDto {
  @ApiProperty()
  currencyId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
