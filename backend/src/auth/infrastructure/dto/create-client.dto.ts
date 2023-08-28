import { IsNotEmpty, IsString } from 'class-validator';
import { IClient } from '../../domain/interface/IClient';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto implements IClient {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  isActive?: boolean;
}
