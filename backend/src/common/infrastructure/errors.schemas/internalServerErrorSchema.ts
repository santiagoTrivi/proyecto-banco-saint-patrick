import { ApiProperty } from '@nestjs/swagger';
import { BaseErrorSchema } from './baseError.schemas';

export class InternalServerErrorSchema extends BaseErrorSchema {
  @ApiProperty({
    example: 'INTERNAL_SERVER_ERROR',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({ required: false })
  error?: string;
}

