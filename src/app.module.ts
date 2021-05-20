import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {genMongoUrl} from "./utils/db";
import {WechatModule} from "./modules/wechat/v1/wechat.module";

const mongoConfig = genMongoUrl(require('../config/db/mongo'));
@Module({
    imports: [
        MongooseModule.forRoot(mongoConfig),
        WechatModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
