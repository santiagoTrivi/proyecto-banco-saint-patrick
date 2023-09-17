import { IsNotEmpty, Length } from "class-validator";
import { CreateCard } from "../../../card/domain/interface/ICreateCard";


export class CreateCardDto implements CreateCard{

    @IsNotEmpty()
    @Length(4, 4)
    PIN: string;

}