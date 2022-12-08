import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class ConfigDto {
  @IsNotEmpty()
  NODE_ENV!: string;

  @IsNotEmpty()
  @Transform((x) => +x.value)
  PORT!: number;

  @IsNotEmpty()
  JWT_SECRET!: string;

  @IsNotEmpty()
  MONGODB_URL!: string;
}
