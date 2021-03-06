import {Injectable} from "@nestjs/common";
import {StudentDao} from "../../../database/dao/student.dao";
import {IStudent} from "../../interfaces/metaData";

// git clone -b main https://github.com/Rxzg/curriculum /data/transit/app
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
     * @param openid 老师的openid
     */
    async getStudents(openid: string, pageNum: number, pageCount: number) {
        const students = await this.studentDao.getOnePageAccount({openid}, pageCount, pageNum);
        const count = await this.studentDao.getStudentsCount({openid});

        // 所有数据
        return {students, count};
    }


    /**
     * 获取该openid下所有学生
     * @param openid
     */
    async getAllStudentsByOpenid(openid: string) {
        return this.studentDao.getAllByOpenid(openid);
    }
}