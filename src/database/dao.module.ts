import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemas/user.schema";
import {UserDao} from "./dao/user.dao";
import {AnniversarySchema} from "./schemas/anniversary.schema";
import {CourseSchema} from "./schemas/course.schema";
import {MemorandumSchema} from "./schemas/memorandum.schema";
import {BillSchema} from "./schemas/bill.schema";
import {AnniversaryDao} from "./dao/anniversary.dao";
import {MemorandumDao} from "./dao/memorandum.dao";
import {BillDao} from "./dao/bill.dao";
import {CourseDao} from "./dao/course.dao";
import {StudentSchema} from "./schemas/student.schema";
import {StudentDao} from "./dao/student.dao";

/**
 * DAO模块
 */
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'users', schema: UserSchema},
            {name: 'course', schema: CourseSchema},
            {name: 'anniversary', schema: AnniversarySchema},
            {name: 'memorandum', schema: MemorandumSchema},
            {name: 'bill', schema: BillSchema},
            {name: 'student', schema: StudentSchema},
            ])
    ],
    providers: [
        UserDao,
        AnniversaryDao,
        MemorandumDao,
        BillDao,
        CourseDao,
        StudentDao

    ],
    exports: [
        UserDao,
        AnniversaryDao,
        MemorandumDao,
        BillDao,
        CourseDao,
        StudentDao
    ],
})
export class DaoModule {

}