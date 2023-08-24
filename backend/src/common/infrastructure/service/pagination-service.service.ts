import { Injectable } from "@nestjs/common";
import { Document, Model } from "mongoose";
import { PaginationResult } from "src/common/domain/interface/IPaginationResult";
import { PaginationDto } from "../dto/Pagination.dto";

@Injectable()
export class PaginationService<T extends Document>{

    constructor(private model: Model<T>){}

    async paginate(query: any, paginationDto: PaginationDto){

        const page = paginationDto.page || 1;
        const limit = paginationDto.limit || 10;

        const startIndex = (page - 1) * limit;

        const data = await this.model
        .find(query)
        .skip(startIndex)
        .limit(limit).exec();


        const totalItems = await this.model
        .countDocuments(query).exec()
        const totalPages = Math.ceil(totalItems / limit);
        
        const paginationResult: PaginationResult<T> = {
            data,
            totalItems,
            totalPages,
            currentPage: page
        }

        return paginationResult;

    }
}