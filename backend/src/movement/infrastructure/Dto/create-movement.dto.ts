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

export class CreateMovementDto implements ICreateMovementDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cardId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  toCard?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  concept: string;

  @ApiProperty({ default: MovementType.TRANSFERENCE })
  @IsNotEmpty()
  @IsEnum(MovementType)
  type: MovementType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  PIN: string;
}

export class createdMovementTransferenceDto extends CreateMovementDto {
  @ApiProperty()
  currencyId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
