import { ApiProperty } from '@nestjs/swagger';
import {ICurrency} from '../../domain/interface/ICurrency'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCurrencyDto implements ICurrency{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    symbol: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    flag_link: string;

}

export class CurrencyObjectData implements ICurrency{

    @ApiProperty()
    _id?: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;

    @ApiProperty()
    symbol: string;

    @ApiProperty()
    isAvailable?: boolean;

    @ApiProperty()
    flag_link: string;

    @ApiProperty()
    createdAt?: Date;

    @ApiProperty()
    updatedAt?: Date;
    
}