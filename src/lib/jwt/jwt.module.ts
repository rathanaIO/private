import { ConfigService } from '@lib/config';
import { Global, Module } from '@nestjs/common';
import { JwtModule as _JwtModule } from '@nestjs/jwt';
@Global()
@Module({
  imports: [
    _JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.env.JWT_SECRET,
      }),
    }),
  ],
  exports: [_JwtModule],
})
export class JwtModule {}
