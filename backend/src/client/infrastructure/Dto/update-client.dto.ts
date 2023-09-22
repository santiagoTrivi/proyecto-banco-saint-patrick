import { ApiProperty } from '@nestjs/swagger';
import { IUpdateClient } from '../../domain/interface/IUpdateClient';
import { IsOptional } from 'class-validator';

export class UdpateClientDto implements IUpdateClient {
  @ApiProperty()
  @IsOptional()
  newPassword?: string;

  @ApiProperty()
  @IsOptional()
  currentPassword?: string;

  @ApiProperty()
  @IsOptional()
  confirmPassword?: string;
}
