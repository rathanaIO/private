import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@lib/config';
import { TypeOrmConfig } from './typeorm.dto';
import * as Entities from '@entities';
import { Injectable } from '@nestjs/common';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const config = this.configService.validate('TypeOrmModule', TypeOrmConfig);
    return {
      type: config.DB_TYPE as any,
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      entities: Object.values(Entities),
      keepConnectionAlive: true, // ! use this for when using webpack
      synchronize: config.DB_SYN,
    };
  }
}
