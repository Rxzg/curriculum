import {Module} from "@nestjs/common";
import {DaoModule} from "../../../database/dao.module";
import {UserService} from "./user.service";

@Module({
    imports: [DaoModule],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {
}