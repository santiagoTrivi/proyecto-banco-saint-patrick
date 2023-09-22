import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { RegisterCurrency } from './useCase/registerCurrency';
import {
  CreateCurrencyDto,
  CurrencyObjectData,
} from './infrastructure/Dto/create-currency.dto';
import { GetCurrencyInfo } from './useCase/getCurrencyInfo';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  DataValidationErrorResponseSchema,
  InternalServerErrorSchema,
} from '../common/infrastructure/errors.schemas';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(
    private readonly registerCurrency: RegisterCurrency,
    private readonly getcurrencyInfo: GetCurrencyInfo,
  ) {}

  @ApiCreatedResponse({ type: CurrencyObjectData })
  @ApiBadRequestResponse({ type: DataValidationErrorResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @HttpCode(201)
  @ApiOperation({
    summary: 'Register currency',
    description:
      'Endpoint to create currencies including the name, code, symbol and more. just for sistem admin',
  })
  @ApiBody({ type: CreateCurrencyDto })
  @Post()
  async register(@Body() createCurrencyDto: CreateCurrencyDto) {
    return await this.registerCurrency.run(createCurrencyDto);
  }

  @ApiOkResponse({ type: CurrencyObjectData, isArray: true })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all the available currencies',
    description:
      'This endpoint allows the client to know available the currencies in our system',
  })
  @Get()
  async getAll() {
    return await this.getcurrencyInfo.getAll();
  }
}
