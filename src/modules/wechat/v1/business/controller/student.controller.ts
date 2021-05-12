import {Body, Controller, Post, UseGuards, Put, Logger, Query, Get, Delete} from "@nestjs/common";
import {WeChatAuthGuard} from "../../../../../common/services/verify/wechatAuth.guard";
import {IStudent, IUser} from "../../../../../common/interfaces/metaData";
import {StudentService} from "../../../../../common/services/student/student.service";

interface StudentDto {
    name: string;
    studentID: string;
}

@Controller('/wechat/student')
@UseGuards(WeChatAuthGuard)
export class StudentController {
    logger: Logger = new Logger(StudentController.name);
    constructor(private studentService: StudentService) {
    }



    /**
     * 添加一个学生
     * @param user
     * @param student 学生
     */
    @Post()
    async addStudent(@Body() {user, student}:
                      {user: IUser, student: StudentDto}) {
        try {
            if (await this.studentService.getStudentByStudentID(student.studentID)) {
                return {code: 2, message: '学生学号已经存在'};
            }

            await this.studentService.create({studentID: student.studentID, name: student.name, openid: user.openid});

            return {code: 1};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '添加一个学生失败'};
        }
    }

    /**
     * 获取一个学生
     * @param openid
     * @param studentID
     */
    @Get()
    async getStudent(@Query() {openid, studentID} : {openid: string, studentID: string}) {
        try {
            const student = await this.studentService.getStudentByStudentID(studentID);

            if (!student) {
                return {code: 2, message: '学生不存在，请检查学号'}
            }

            return {code: 1, student}
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '获取一个学生失败'};
        }
    }

    /**
     * 修改一个学生
     * @param user
     * @param student
     */
    @Put()
    async editStudent(@Body() {user, student}: {user: IUser, student: IStudent}) {
        try {
            const _student = await this.studentService.getStudentByStudentID(student.studentID);

            if (!_student) {
                return {code: 2, message: '学生不存在，请检查学号'}
            }

            await this.studentService.modifyStudent(student);

            return {code: 1}
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '修改一个学生失败'};
        }
    }

    /**
     * 删除一个学生
     * @param openid
     * @param studentID
     */
    @Delete()
    async removeStudent(@Query() {openid, studentID}: {openid: string, studentID: string}) {
        try {
            const _student = await this.studentService.getStudentByStudentID(studentID);

            if (!_student) {
                return {code: 2, message: '学生不存在，请检查学号'};
            }

            if (_student.openid !== openid) {
                return {code: 2, message: '这不是你的学生，你无权删除'};
            }

            await this.studentService.removeStudent(studentID);

            return {code: 1}
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '修改一个学生失败'};
        }
    }
}