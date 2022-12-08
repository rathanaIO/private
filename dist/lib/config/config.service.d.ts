import { ConfigDto } from './config.dto';
export declare class ConfigService {
    readonly env: ConfigDto;
    private readonly envConfig;
    constructor();
    get(key: string): string;
    validate<T>(module: string, className: new () => T): T;
}
