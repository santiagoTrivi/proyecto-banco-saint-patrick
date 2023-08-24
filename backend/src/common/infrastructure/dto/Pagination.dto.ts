import { ApiProperty } from "@nestjs/swagger";
import { IPaginationOption } from "../../domain/interface/IpaginationOpstions";
import { IsOptional } from "class-validator";


export class PaginationDto implements IPaginationOption{

    
    @IsOptional()
    page?: number;

    
    @IsOptional()
    limit?: number;
}