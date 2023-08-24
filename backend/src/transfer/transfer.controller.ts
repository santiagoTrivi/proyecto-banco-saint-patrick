import { Body, Controller, Get, Post, UseGuards, Param, Query } from '@nestjs/common';
import { TransferService } from './infrastructure/service/transfer.service';
import { TransferFundsProcess } from './useCase/transferFunds.process.useCase';
import { CreateTransferDto, TransferObject } from './infrastructure/dto/create-transfer.dto';
import { JwtAuthGuard } from '../auth/infrastructure/guards/jwt.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HistoryTransferDto } from './infrastructure/dto/history-transfer.dto';

@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
    private readonly transferFundsProcess: TransferFundsProcess,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({type: TransferObject})
  @ApiOperation({ 
    summary: 'Transfer money',
    description: 'this endpoint allows authenticated user to tranfer money to any card providing the receiver card number' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async tranferFunds(@Body() createTransferDto: CreateTransferDto) {
    return await this.transferFundsProcess.run(createTransferDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({type: HistoryTransferDto})
  @Get(':cardId')
  @ApiOperation({
    summary: 'Get transfer history',
    description: 'Get all the transfers made by a specific user',
  })
  @ApiParam({ name: 'cardId', type: String, description: 'ID of the card' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Number of items per page' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number' })
  @UseGuards(JwtAuthGuard)
  async transferList( @Param('cardId') cardId: string, @Query() paginationDto) {
    return await this.transferService.getTransferHistory(cardId, paginationDto);
  }

  async getAlltransfer(){
    
  }
}
