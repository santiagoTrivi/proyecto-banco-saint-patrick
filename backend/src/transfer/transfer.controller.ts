import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransferService } from './service/transfer.service';
import { TransferFundsProcess } from './useCase/transferFunds.process.useCase';
import { CreateTransferDto } from './domain/dto/create-transfer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
    private readonly transferFundsProcess: TransferFundsProcess,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async tranferFunds(@Body() createTransferDto: CreateTransferDto) {
    return await this.transferFundsProcess.run(createTransferDto);
  }

  @Get()
  async transferList(){
    return await this.transferService.getTansfers()
  }
}
