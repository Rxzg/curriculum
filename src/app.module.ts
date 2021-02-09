import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {genMongoUrl} from "./utils/db";
import {WechatModule} from "./modules/wechat/v1/wechat.module";

// MongooseModule.forRoot(genMongoUrl(require('../../config/db/mongo').development))
@Module({
    imports: [
        MongooseModule.forRoot(genMongoUrl(require('../../config/db/mongo').development)),
        WechatModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
