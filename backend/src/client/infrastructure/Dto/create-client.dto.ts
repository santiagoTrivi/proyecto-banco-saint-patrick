import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IClient } from '../../domain/interface/IClient';
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  cards?: string;

}
