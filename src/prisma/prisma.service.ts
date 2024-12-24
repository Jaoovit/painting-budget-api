import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

Injectable();
export class PrismaService extends PrismaClient {
  constructor() {
    const DATABASE_URL = process.env.DATABASE_URL;
    super({
      datasources: {
        db: {
          url: DATABASE_URL,
        },
      },
    });
  }
}
