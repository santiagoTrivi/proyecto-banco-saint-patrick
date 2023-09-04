import { ApiProperty } from '@nestjs/swagger';
import { Ilogin } from '../../domain/interface/Ilogin';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto implements Ilogin {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(16)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  password: string;
}

export class AuthenticationTokens {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
}
