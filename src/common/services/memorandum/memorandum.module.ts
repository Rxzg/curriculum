import {Module} from "@nestjs/common";
import {DaoModule} from "../../../database/dao.module";
import {MemorandumService} from "./memorandum.service";

@Module({
    imports: [DaoModule],
    providers: [MemorandumService],
    exports: [MemorandumService]
})
export class MemorandumModule {
}