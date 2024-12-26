import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { EditClientDto } from './dto/edit-client.dto';

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
    return this.clientService.getClientsByUserId(userId);
  }

  @Get(':id')
  getClientById(@Param('id') clientId: number, @GetUser('id') userId: number) {
    return this.clientService.getClientByIdWithBudgets(+clientId, userId);
  }

  @Patch(':id')
  updateClient(@Body() dto: EditClientDto, @Param('id') clientId: number) {
    return this.clientService.updateClient(dto, +clientId);
  }
}
