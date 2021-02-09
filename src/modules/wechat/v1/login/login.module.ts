import {Module, HttpModule} from "@nestjs/common";
import {LoginController} from "./controller/login.controller";
import {LoginService} from "./services/login.service";
import {UserModule} from "../../../../common/services/user/user.module";
import {VerifyModule} from "../../../../common/services/verify/verify.module";

/**
 * 后台登录模块
 */
@Module({
    imports: [UserModule, HttpModule, VerifyModule],
    controllers: [LoginController],
    providers: [LoginService]
})
export class LoginModule {

}