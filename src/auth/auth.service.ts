import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSignUpDto } from './dto/user.signup.dto';
import * as T from '@common/enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/schema/user.schema';
import { UserLoginInputDto } from './dto/userlogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async seed() {
    const hashPassword = await bcrypt.hash('vath', await bcrypt.genSalt());
    const user = {
      email: 'vath@gmail.com',
      password: hashPassword,
      sub_duration: 0,
      role: T.UserRole.ADMIN,
      validDate: new Date(),
      status: T.UserStatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const findUser = await this.userModel.findOne({ email: 'vath@gmail.com' });
    if (findUser) throw new BadRequestException('Email already seeded');
    const createUser = new this.userModel(user);
    createUser.save();
    return true;
  }
  async signup(signupInput: UserSignUpDto) {
    const { email, password, sub_duration } = signupInput;
    const findUser = await this.userModel.findOne({ email });
    if (findUser) throw new BadRequestException('Email already exist');
    const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const user = {
      email,
      password: hashPassword,
      sub_duration,
      role: T.UserRole.USER,
      validDate: new Date(),
      status: T.UserStatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createUser = new this.userModel(user);
    createUser.save();
    return true;
  }

  async login(loginInput: UserLoginInputDto) {
    const { email, password } = loginInput;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) throw new BadRequestException('User not found');
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) throw new BadRequestException('Invalid password');
    const payload = {
      email,
      role: findUser.role,
      status: findUser.status,
      validDate: findUser.validDate,
      sub_duration: findUser.sub_duration,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    console.log(accessToken);
    const user = {
      email: findUser.email,
      status: findUser.status,
      validDate: findUser.validDate,
      sub_duration: findUser.sub_duration,
      accessToken,
    };
    return user;
  }
}
