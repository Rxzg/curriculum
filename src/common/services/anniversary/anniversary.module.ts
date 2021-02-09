import {Module} from "@nestjs/common";
import {DaoModule} from "../../../database/dao.module";
import {AnniversaryService} from "./anniversary.service";

@Module({
    imports: [DaoModule],
        providers: [AnniversaryService],
    exports: [AnniversaryService]
})
export class AnniversaryModule {
}