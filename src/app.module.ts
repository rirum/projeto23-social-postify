import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UserModule, PrismaModule, AuthenticationModule],
})
export class AppModule {}
