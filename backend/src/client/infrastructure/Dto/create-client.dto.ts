import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IClient } from '../../domain/interface/IClient';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCardDto } from '../../../auth/infrastructure/dto/create-card.dto';

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
  cards?: CreateCardDto;

  @ApiProperty()
  @IsOptional()
  refreshToken?: string;
}
