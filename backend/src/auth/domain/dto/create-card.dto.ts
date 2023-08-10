import { IsNotEmpty, Length, IsString } from "class-validator";
import { ICard } from "../interface/ICard";


export class CreateCardDto implements ICard{

    @IsNotEmpty()
    @IsString()
    @Length(16)
    card_number: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 4)
    PIN: string;

    @IsNotEmpty()
    current_balance: number;

    @IsNotEmpty()
    client: any;
    
}