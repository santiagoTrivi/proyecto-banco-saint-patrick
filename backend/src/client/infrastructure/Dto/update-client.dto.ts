import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UdpateClientDto extends PartialType(CreateClientDto) {
  refreshToken: string;
}
