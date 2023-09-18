import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Request,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ClientService } from './infrastructure/services/client.service';
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
import { UdpateClientDto } from './infrastructure/Dto/update-client.dto';
import { AddCardProcess } from './useCase/addCardProcess';
import { CreateCardDto } from '../card/infrastructure/Dto/create-card.dto';
import { JwtAuthGuard } from '../auth/infrastructure/guards';
import {
  DataValidationErrorResponseSchema,
  InternalServerErrorSchema,
  UnauthorizedResponseSchema,
} from '../common/infrastructure/errors.schemas';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly addCardProcess: AddCardProcess,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Request() req, @Body() updateClientDto: UdpateClientDto) {
    const { password } = updateClientDto;
    //await this.clientService.update(req.user.uuid, password)
    return updateClientDto;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({})
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
  @ApiParam({
    name: 'clientId',
    type: String,
    description: 'ID of the client authenticatec',
  })
  @ApiBody({ type: CreateCardDto })
  @Post('card/:clientId')
  async addCard(
    @Param('clientId') clientId,
    @Body() createCardDto: CreateCardDto,
  ) {
    const { PIN } = createCardDto;
    await this.addCardProcess.run(clientId, PIN);
  }
}
