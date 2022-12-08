import { UserSignUpDto } from './dto/user.signup.dto';
import * as T from '@common/enum';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { UserLoginInputDto } from './dto/userlogin.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    signup(signupInput: UserSignUpDto): Promise<boolean>;
    login(loginInput: UserLoginInputDto): Promise<{
        email: string;
        status: T.UserStatusEnum;
        validDate: Date;
        sub_duration: number;
        accessToken: string;
    }>;
}
