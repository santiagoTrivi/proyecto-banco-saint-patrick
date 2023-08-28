import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseErrorSchema {
  @ApiProperty()
  statusCode: number;
}
