import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User not exist');

    delete user.hash;

    return user;
  }

  async editUserName(dto: EditUserDto, userId: number) {
    await this.getUserById(userId);

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: dto.name,
      },
    });

    delete user.hash;

    return user;
  }
}
