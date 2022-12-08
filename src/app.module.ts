import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@lib/config';
import { JwtModule } from '@lib/jwt';
import { MongoDBModule } from '@lib/mogoose';
@Module({
  imports: [AuthModule, ConfigModule, JwtModule, MongoDBModule],
})
export class AppModule {}
