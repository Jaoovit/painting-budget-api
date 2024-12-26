import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@UseGuards(JwtGuard)
@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  createClient(@Body() dto: CreateClientDto, @GetUser('id') userId: number) {
    return this.clientService.createClient(dto, userId);
  }

  @Get('user')
  getClientByUserId(@GetUser('id') userId: number) {
    return this.clientService.getClientByUserId(userId);
  }

  @Get(':id')
  getClientById(@Param('id') clientId: number, @GetUser('id') userId: number) {
    return this.clientService.getClientById(+clientId, userId);
  }
}
