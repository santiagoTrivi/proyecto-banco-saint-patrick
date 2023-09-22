import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { createdMovementTransferenceDto } from './create-movement.dto';
import { createdMovementDepositDto } from './create-movementDeposit.dto';
import { IsOptional } from 'class-validator';

@ApiExtraModels(createdMovementDepositDto, createdMovementTransferenceDto)
export default class CreatedMovementResponseDto {
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [
        {
          $ref: getSchemaPath(createdMovementDepositDto),
        },
        {
          $ref: getSchemaPath(createdMovementTransferenceDto),
        },
      ],
    },
  })
  @IsOptional()
  readonly Movement: CreatedMovementResponseDto[];
}
