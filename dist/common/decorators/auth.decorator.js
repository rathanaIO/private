"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const Auth = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map