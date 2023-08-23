import { IsNotEmpty, IsString } from 'class-validator';
import { IClient } from '../interface/IClient';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto implements IClient {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
