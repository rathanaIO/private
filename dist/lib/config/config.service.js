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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const config_dto_1 = require("./config.dto");
let ConfigService = class ConfigService {
    constructor() {
        this.envConfig = process.env;
        this.env = this.validate('ConfigModule', config_dto_1.ConfigDto);
    }
    get(key) {
        return this.envConfig[key];
    }
    validate(module, className) {
        const config = (0, class_transformer_1.plainToClass)(className, this.envConfig);
        const errors = (0, class_validator_1.validateSync)(config, {
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: false,
        });
        if (errors.length > 0) {
            errors.forEach((e) => common_1.Logger.error(`${e.constraints[Object.keys(e.constraints)[0]]}`, undefined, module));
            throw new Error(`${module}: Invalid environment config.`);
        }
        return config;
    }
};
ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map