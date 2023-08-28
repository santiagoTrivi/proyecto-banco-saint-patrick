import { ApiProperty } from '@nestjs/swagger';
import { BaseErrorSchema } from './baseError.schemas';

export class UnauthorizedResponseSchema extends BaseErrorSchema {
  @ApiProperty({ example: 'Unauthorized', description: 'Error message' })
  message: string;

  @ApiProperty({ required: false })
  error?: string;
}
