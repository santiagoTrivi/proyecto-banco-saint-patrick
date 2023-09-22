import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Request,
  Param,
  HttpCode,
  Patch,
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
import { UdpateClientDto } from './infrastructure/Dto/update-client.dto';
import { JwtAuthGuard } from '../auth/infrastructure/guards';
import {
  DataValidationErrorResponseSchema,
  InternalServerErrorSchema,
  NotFoundErrorResponseSchema,
  UnauthorizedResponseSchema,
} from '../common/infrastructure/errors.schemas';
import { UpdateClientInfo } from './useCase/updateClientInfo';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly updateClientInfo: UpdateClientInfo) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseSchema })
  @ApiNotFoundResponse({ type: NotFoundErrorResponseSchema })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiOperation({
    summary: 'Update Client data',
    description: 'For any client data. password updata allowed for now',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UdpateClientDto,
  ) {
    return await this.updateClientInfo.update(id, updateClientDto);
  }
}
