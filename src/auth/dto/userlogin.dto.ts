import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginInputDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'invalid email' })
  email: string;

  @IsNotEmpty()
  password: string;
}
