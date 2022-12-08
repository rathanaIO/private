import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TypeOrmConfig {
  @IsNotEmpty()
  DB_TYPE: string;

  @IsNotEmpty()
  @IsString()
  DB_HOST!: string;

  @IsNotEmpty()
  @Transform((x) => +x.value)
  DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME!: string;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD!: string;

  @IsNotEmpty()
  DB_NAME: string;

  @IsNotEmpty()
  DB_SYN: boolean;
}
