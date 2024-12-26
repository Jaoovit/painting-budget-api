import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createClient(dto: CreateClientDto, userId: number) {
    const user = await this.userService.getUserById(userId);

    const client = await this.prisma.client.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        userId: user.id,
      },
    });

    return client;
  }
}
