import {Module, HttpModule} from "@nestjs/common";
import {UserModule} from "../../../../common/services/user/user.module";
import {CourseController} from "./controller/course.controller";
import {CourseModule} from "../../../../common/services/course/course.module";
import {BillModule} from "../../../../common/services/bill/bill.module";
import {AnniversaryModule} from "../../../../common/services/anniversary/anniversary.module";
import {MemorandumModule} from "../../../../common/services/memorandum/memorandum.module";
import {MemorandumController} from "./controller/memorandum.controller";
import {BillController} from "./controller/bill.controller";
import {AnniversaryController} from "./controller/aniversary.controller";

/**
 * 后台登录模块
 */
@Module({
    imports: [UserModule, HttpModule, CourseModule, BillModule, AnniversaryModule, MemorandumModule],
    controllers: [CourseController, MemorandumController, BillController, AnniversaryController, MemorandumController],
    providers: [],
})
export class BusinessModule {

}