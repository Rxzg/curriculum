import {Injectable} from "@nestjs/common";
import {StudentDao} from "../../../database/dao/Student.dao";
import {IStudent} from "../../interfaces/metaData";

interface CreateStudentDto {
    // 学生名字
    name: string;

    // 创建人id
    openid: string;

    // 英文名
    englishName: string;

    studentID: string;
}

@Injectable()
export class StudentService {
    constructor(private studentDao: StudentDao) {
    }

    /**
     * 创建一个账户
     * @param createStudentDto
     */
    async create(createStudentDto: CreateStudentDto) {

        return await this.studentDao.crate(createStudentDto);
    }

    /**
     * 通过学号查找一个学生
     * @param studentID
     */
    async getStudentByStudentID(studentID: string) {
        return await this.studentDao.findOne(studentID);
    }

    /**
     * 修改一个学生
     * @param student
     */
    async modifyStudent(student: IStudent) {
        return this.studentDao.updateOne({studentID: student.studentID}, student);
    }

    /**
     * 删除一个学生
     * @param studentID
     */
    async removeStudent(studentID: string) {
        return this.studentDao.deleteOne(studentID)
    }


    /**
     * 获取一些学生
     * @param pageNum
     * @param pageCount
     */
    async getStudents(pageNum: number, pageCount: number) {
        const accounts = await this.studentDao.getOnePageAccount({}, pageCount, pageNum);
        const count = 0

        // 所有数据
        return {accounts, count};
    }
}