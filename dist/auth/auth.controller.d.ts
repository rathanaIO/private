import { AuthService } from './auth.service';
import { UserSignUpDto } from './dto/user.signup.dto';
import { UserLoginInputDto } from './dto/userlogin.dto';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    signUp(signupInput: UserSignUpDto): Promise<boolean>;
    login(loginInput: UserLoginInputDto): Promise<{
        email: string;
        status: import("../common/enum").UserStatusEnum;
        validDate: Date;
        sub_duration: number;
        accessToken: string;
    }>;
    authorize(): Promise<boolean>;
    privileges(): Promise<boolean>;
    greeting(): Promise<string>;
}
