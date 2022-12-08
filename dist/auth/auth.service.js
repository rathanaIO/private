"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const T = require("../common/enum");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signup(signupInput) {
        const { email, password, sub_duration } = signupInput;
        const findUser = await this.userModel.findOne({ email });
        if (findUser)
            throw new common_1.BadRequestException('Email already exist');
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
    async login(loginInput) {
        const { email, password } = loginInput;
        const findUser = await this.userModel.findOne({ email });
        if (!findUser)
            throw new common_1.BadRequestException('User not found');
        const comparePassword = await bcrypt.compare(password, findUser.password);
        if (!comparePassword)
            throw new common_1.BadRequestException('Invalid password');
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
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map