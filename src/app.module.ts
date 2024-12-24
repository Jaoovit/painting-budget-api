import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [],
  providers: [PrismaModule, AuthModule],
})
export class AppModule {}
