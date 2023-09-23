import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { CreateMovementDto } from './infrastructure/Dto/create-movement.dto';
import { MainMovementHandler } from './useCase/mainMovementHandler';
import { GetMovementData } from './useCase/getMovementData';
import { IPaginationOption } from '@common/domain/interface/IpaginationOpstions';
import {
  DataValidationErrorResponseSchema,
  InternalServerErrorSchema,
  UnauthorizedResponseSchema,
} from '@common/infrastructure/errors.schemas';
import { JwtAuthGuard } from '@auth/infrastructure/guards';
import MovementDto from './infrastructure/Dto/movement.dto';
import CreatedMovementResponseDto from './infrastructure/Dto/created-movement-response.dto';
import { HistoryMovementDto } from './infrastructure/Dto/pagination-movement-response.dto';

@ApiTags('movement')
@Controller('movement')
export class MovementController {
  constructor(
    private readonly mainMovementHandler: MainMovementHandler,
    private readonly getMovementData: GetMovementData,
  ) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreatedMovementResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiBadRequestResponse({ type: DataValidationErrorResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Create Movement',
    description:
      'This endpoint allows authenticated user create movement, either deposit or transference using any card',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: MovementDto })
  @Post()
  async create(@Body() createMovement: CreateMovementDto) {
    return await this.mainMovementHandler.execute(createMovement);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: HistoryMovementDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Get paginated Movements',
    description:
      'This endpoint allows authenticated user to get their card movement, providing the paginated data',
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
  @Get(':cardId')
  async getPaginationmmovement(
    @Param('cardId') cardId: string,
    @Query() paginations: IPaginationOption,
  ) {
    return this.getMovementData.PoaginationMovementByCard(cardId, paginations);
  }
}
