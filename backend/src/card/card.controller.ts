import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCardDto } from './infrastructure/Dto/create-card.dto';
import {
  DataValidationErrorResponseSchema,
  InternalServerErrorSchema,
  UnauthorizedResponseSchema,
} from '../common/infrastructure/errors.schemas';
import { JwtAuthGuard } from '../auth/infrastructure/guards';
import { AddCardProcess } from './usecase/addCardProcess';
import { CardDto } from './infrastructure/Dto/card.dto';

@ApiTags('card')
@Controller('card')
export class CardController {
  constructor(private readonly addCardProcess: AddCardProcess) {}

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
}
