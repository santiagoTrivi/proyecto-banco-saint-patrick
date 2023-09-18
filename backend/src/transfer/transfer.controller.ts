import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/infrastructure/guards/jwt.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateTransferDto,
  TransferDetails,
  TransferObject,
} from './infrastructure/dto';
import { HistoryTransferDto } from './infrastructure/dto/history-transfer.dto';
import {
  DataValidationErrorResponseSchema,
  InternalServerErrorSchema,
  UnauthorizedResponseSchema,
} from '../common/infrastructure/errors.schemas';
import { TransferFundsProcessHandler } from './useCase/transferFundProcessHandler';
import { GetTransferData } from './useCase/getTransferData';

@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
  constructor(
    private readonly transferFundsprocessHandler: TransferFundsProcessHandler,
    private readonly getTrasnferData: GetTransferData,
  ) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TransferObject })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiBadRequestResponse({ type: DataValidationErrorResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Transfer money',
    description:
      'this endpoint allows authenticated user to tranfer money to any card providing the receiver card number',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateTransferDto })
  @Post()
  async tranferFunds(@Body() createTransferDto: CreateTransferDto) {
    return await this.transferFundsprocessHandler.run(createTransferDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: HistoryTransferDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @Get(':cardId')
  @ApiOperation({
    summary: 'Get transfer history',
    description: 'Get all the transfers made by a specific client',
  })
  @ApiParam({ name: 'cardId', type: String, description: 'ID of the card' })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
  })
  @UseGuards(JwtAuthGuard)
  async transferList(@Param('cardId') cardId: string, @Query() paginationDto) {
    return this.getTrasnferData.transfersByCard(cardId, paginationDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: TransferDetails })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiBadRequestResponse({ type: DataValidationErrorResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiParam({
    name: 'transferId',
    type: String,
    description: 'ID of a expecific tranfer',
  })
  @Get(':transferId/details')
  @ApiOperation({
    summary: 'Transfer details',
    description:
      'Endpoint to get more information about a specific transfer made, such as sender ans receiver card info',
  })
  @UseGuards(JwtAuthGuard)
  async showTransferDetails(@Param('transferId') transferId: string) {
    return this.getTrasnferData.transferDetails(transferId);
  }
}
