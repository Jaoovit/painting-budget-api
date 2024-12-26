import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { EditClientDto } from './dto/edit-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async createClient(dto: CreateClientDto, userId: number) {
    let client = await this.prisma.client.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (client) {
      if (client.phone !== dto.phone)
        throw new ConflictException(
          'A client with this email already exists, but the phone number does not match.',
        );

      await this.prisma.client.update({
        where: {
          id: client.id,
        },
        data: {
          users: {
            connect: { id: userId },
          },
        },
      });
    } else {
      client = await this.prisma.client.create({
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          users: {
            connect: { id: userId },
          },
        },
      });
    }

    return client;
  }

  async getClientsByUserId(userId: number) {
    const clients = await this.prisma.client.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    return clients;
  }

  async getClientByIdWithBudgets(clientId: number, userId: number) {
    const client = await this.prisma.client.findUnique({
      where: {
        id: clientId,
      },
      include: {
        budgets: {
          where: {
            userId,
          },
        },
      },
    });

    if (!client) throw new NotFoundException('Client not exist');

    return client;
  }

  async getClientById(clientId: number) {
    const client = await this.prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    return client;
  }

  async updateClient(dto: EditClientDto, clientId: number) {
    let client = await this.getClientById(clientId);

    if (!client) throw new NotFoundException('Client not exist');

    client = await this.prisma.client.update({
      where: { id: clientId },
      data: {
        email: dto.email,
        phone: dto.phone,
      },
    });

    return client;
  }
}
