import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { CreateMovementDto } from './create-movement.dto';
import { CreateMovementDepositDto } from './create-movementDeposit.dto';
import { IsOptional } from 'class-validator';

@ApiExtraModels(CreateMovementDto, CreateMovementDepositDto)
export default class MovementDto {
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [
        {
          $ref: getSchemaPath(CreateMovementDto),
        },
        {
          $ref: getSchemaPath(CreateMovementDepositDto),
        },
      ],
    },
  })
  @IsOptional()
  readonly Movement: MovementDto[];
}
