import { ApiProperty } from '@nestjs/swagger';
import { Ilogin } from '../../domain/interface/Ilogin';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IAuthentication } from '../../domain/interface/IAuthentication';

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

export class AuthenticationTokens implements IAuthentication {

  @ApiProperty()
  expireIn: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  refreshExpireIn: string;
}

export class RefreshToken implements IAuthentication {

  @ApiProperty()
  expireIn: string;

  @ApiProperty()
  access_token: string;

}

