import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IClient } from '../../domain/interface/IClient';
import { ApiProperty } from '@nestjs/swagger';
import { CardDetail } from '../../../card/infrastructure/Dto/cardDetail';

export class CreateClientDto implements IClient {
  @ApiProperty()
  @IsOptional()
  id?: any;

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

  @ApiProperty()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ isArray: true })
  @IsOptional()
  cards?: CardDetail;

  @ApiProperty()
  @IsOptional()
  refreshToken?: string;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date;
}

export class RegisterClientDto implements IClient {
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
}
