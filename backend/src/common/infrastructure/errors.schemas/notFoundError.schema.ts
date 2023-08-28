import { ApiProperty } from '@nestjs/swagger';
import { BaseErrorSchema } from './baseError.schemas';

export class NotFoundErrorResponseSchema extends BaseErrorSchema {
  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  error?: string;
}
