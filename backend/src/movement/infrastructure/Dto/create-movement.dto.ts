import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ICreateMovementDto } from '../../../movement/domain/interface/ICreateMovementDto';
import { MovementType } from '../../../movement/domain/movementType';

export class CreateMovementDto implements ICreateMovementDto {
  @IsNotEmpty()
  @IsString()
  cardId: string;

  @IsOptional()
  @IsString()
  toCard?: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  concept: string;

  @IsNotEmpty()
  @IsEnum(MovementType)
  type: MovementType;

  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  PIN: string;
}
