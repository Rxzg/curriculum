import {MongoConfig} from "../common/dto/db.dto";

/**
 * 生成mongo url
 * @param config 数据库配置
 */
export function genMongoUrl(config: MongoConfig) {
    if (config.user) {
        return `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.db}`;
    }

    return `mongodb://${config.host}:${config.port}/${config.db}`;
}