import { Ilogin } from '../interface/Ilogin';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto implements Ilogin {
  @IsNotEmpty()
  @IsString()
  @Length(16)
  card_number: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  PIN: string;
}
