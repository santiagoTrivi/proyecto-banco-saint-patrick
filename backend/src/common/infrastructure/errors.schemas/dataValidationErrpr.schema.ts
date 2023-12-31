import { ApiProperty } from '@nestjs/swagger';
import { BaseErrorSchema } from './baseError.schemas';

export class DataValidationErrorResponseSchema extends BaseErrorSchema {
  @ApiProperty({ isArray: true })
  message: string;

  @ApiProperty({ required: false })
  error?: string;
}

export class BadRequestErrorResponseSchema extends BaseErrorSchema {
  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  error?: string;
}
