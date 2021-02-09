import {Module} from "@nestjs/common";
import {LoginModule} from "./login/login.module";
import {BusinessModule} from "./business/business.module";


@Module({
    imports: [LoginModule, BusinessModule]
})
export class WechatModule {

}