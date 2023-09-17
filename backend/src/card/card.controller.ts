import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateCardDto } from "./infrastructure/Dto/create-card.dto";
import { RegisterCard } from "./usecase/registerCard";


@ApiTags()
@Controller()
export class CardController{
    constructor(private readonly registerCard: RegisterCard){}


}