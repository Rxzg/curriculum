import {Module, HttpModule, Controller} from "@nestjs/common";
import {UserModule} from "../../../../common/services/user/user.module";
import {CourseController} from "./controller/course.controller";
import {CourseModule} from "../../../../common/services/course/course.module";

/**
 * 后台登录模块
 */
@Module({
    imports: [UserModule, HttpModule, CourseModule],
    controllers: [CourseController],
    providers: [],
})
export class BusinessModule {

}