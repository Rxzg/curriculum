import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {genMongoUrl} from "./utils/db";
import {WechatModule} from "./modules/wechat/v1/wechat.module";

// MongooseModule.forRoot(genMongoUrl(require('../../config/db/mongo').development))
const mongoConfig = {
    "host": "127.0.0.1",
    "port": 27019,
    "db": "op",
    "user": "",
    "password": ""
}
@Module({
    imports: [
        MongooseModule.forRoot(mongoConfig as any),
        WechatModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
