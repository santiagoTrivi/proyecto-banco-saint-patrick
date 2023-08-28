import { ApiProperty } from '@nestjs/swagger';
import { BaseErrorSchema } from './baseError.schemas';

export class ForbiddenErrorResponseChema extends BaseErrorSchema {
  @ApiProperty({ example: 'Access Denied' })
  message: string;

  @ApiProperty({ example: 'Forbidden' })
  error: string;
}
