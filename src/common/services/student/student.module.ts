
import {Module} from "@nestjs/common";
import {DaoModule} from "../../../database/dao.module";
import {StudentService} from "./student.service";

@Module({
    imports: [DaoModule],
    providers: [StudentService],
    exports: [StudentService]
})
export class StudentModule {
}