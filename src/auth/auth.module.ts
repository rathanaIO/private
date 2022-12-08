import { MongoDBModule } from '@lib/mogoose';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, MongoDBModule],
})
export class AuthModule {}
