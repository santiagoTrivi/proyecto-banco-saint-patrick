import { PaginationResult } from "src/common/domain/interface/IPaginationResult";
import { ApiProperty } from "@nestjs/swagger";
import { TransferObject } from "./create-transfer.dto";

export class HistoryTransferDto implements PaginationResult<TransferObject>{

    @ApiProperty({
        type: TransferObject,
        isArray: true
    })
    data: TransferObject[];
    
    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    currentPage: number;


}