import { Auth } from '@common/decorators/auth.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
// import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dto/user.signup.dto';
import { UserLoginInputDto } from './dto/userlogin.dto';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Auth('admin')
  @Post('signup')
  async signUp(@Body() signupInput: UserSignUpDto) {
    return this.service.signup(signupInput);
  }

  @Post('login')
  async login(@Body() loginInput: UserLoginInputDto) {
    return this.service.login(loginInput);
  }

  @Auth()
  @Get('authorize')
  async authorize() {
    return true;
  }

  @Auth('admin')
  @Get('privileges')
  async privileges() {
    return true;
  }

  @Get('seed')
  async seedData() {
    return this.service.seed();
  }

  @Get()
  async greeting() {
    return "It's worked !!!";
  }
}
