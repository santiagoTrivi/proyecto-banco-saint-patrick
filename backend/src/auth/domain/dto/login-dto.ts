import { ApiProperty } from '@nestjs/swagger';
import { Ilogin } from '../interface/Ilogin';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto implements Ilogin {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(16)
  card_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  PIN: string;
}
