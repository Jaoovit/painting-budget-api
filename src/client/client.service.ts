import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

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
}
