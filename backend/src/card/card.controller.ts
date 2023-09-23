import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Request,
  Patch,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCardDto } from './infrastructure/Dto/create-card.dto';
import {
  DataValidationErrorResponseSchema,
  InternalServerErrorSchema,
  NotFoundErrorResponseSchema,
  UnauthorizedResponseSchema,
} from '@common/infrastructure/errors.schemas';
import { JwtAuthGuard } from '@auth/infrastructure/guards';
import { AddCardProcess } from './usecase/addCardProcess';
import { CardDto } from './infrastructure/Dto/card.dto';
import { UdpateCardDto } from './infrastructure/Dto/update-card.dto';
import { UpdateCardtInfo } from './usecase/updateCardInfo';
import { GetCardInfo } from './usecase/getCardInfo';
import { CardDetail } from './infrastructure/Dto/cardDetail';

@ApiTags('card')
@Controller('card')
export class CardController {
  constructor(
    private readonly addCardProcess: AddCardProcess,
    private readonly updateCardInfo: UpdateCardtInfo,
    private readonly getCardInfo: GetCardInfo) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CardDto })
  @ApiBadRequestResponse({ type: DataValidationErrorResponseSchema })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Register a new card',
    description:
      'This endpoint allows clients to create a new card, automatically generating a unique card_number to make any kind of movement. keep in mind, that the maximun number of cards allowed is 3 per client.',
  })
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateCardDto })
  @Post()
  async addCard(@Request() req, @Body() createCardDto: CreateCardDto) {
    return await this.addCardProcess.run(req.user.uuid, createCardDto);
  }
  
  @ApiBearerAuth()
  @ApiOkResponse({type: CardDetail})
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiNotFoundResponse({ type: NotFoundErrorResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Find card by id',
    description: 'find the full card data ',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCard(@Param('id') id: string,){
    return await this.getCardInfo.run(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiNotFoundResponse({ type: NotFoundErrorResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Update Card data',
    description: 'For any card data. PIN updata allowed for now',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UdpateCardDto,
  ) {
    return await this.updateCardInfo.update(id, updateCardDto);
  }

}
