import { IsNotEmpty, IsString } from "class-validator";
import { IClient } from "../interface/IClient";


export class CreateClientDto implements IClient {

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    
}
