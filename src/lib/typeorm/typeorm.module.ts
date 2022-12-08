import { Module } from '@nestjs/common';
import { TypeOrmModule as OrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm.service';
import * as Entities from '@entities';
// import { TypeOrmConfigService } from './typeorm.service';
@Module({
  imports: [OrmModule.forRootAsync({ useClass: TypeOrmConfigService })],
  exports: [OrmModule.forFeature([...Object.values(Entities)])],
})
export class TypeOrmModule {}
