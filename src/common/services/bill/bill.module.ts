import {Module} from "@nestjs/common";
import {DaoModule} from "../../../database/dao.module";
import {BillService} from "./bill.service";

@Module({
    imports: [DaoModule],
    providers: [BillService],
    exports: [BillService]
})
export class BillModule {
}