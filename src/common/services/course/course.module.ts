import {Module} from "@nestjs/common";
import {DaoModule} from "../../../database/dao.module";
import {CourseService} from "./course.service";

@Module({
    imports: [DaoModule],
    providers: [CourseService],
    exports: [CourseService]
})
export class CourseModule {
}