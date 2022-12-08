import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  sub_duration: number;
}
