import {Body, Controller, Post, UseGuards, Put, Logger, Query, Get, Delete} from "@nestjs/common";
import {WeChatAuthGuard} from "../../../../../common/services/verify/wechatAuth.guard";
import {ICourse, IUser} from "../../../../../common/interfaces/metaData";
import {CourseService} from "../../../../../common/services/course/course.service";
import {StudentService} from "../../../../../common/services/student/student.service";

@Controller('/wechat/course')
@UseGuards(WeChatAuthGuard)
export class CourseController {
    logger: Logger = new Logger(CourseController.name);
    constructor(private courseService: CourseService, private studentService: StudentService) {
    }

    /**
     * 添加一个课程
     * @param user 用户
     * @param name 老师名字
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param duration 时长
     * @param studentID 学号
     */
    @Post()
    async addCourse(@Body() {user, name, startTime, endTime, duration, studentID}:
                            {user: IUser, name: string, startTime: number, endTime: number, duration: number, studentID: string}) {
        try {
            if (!name) {
                return {code: 2, message: '学生名字不能为空'}
            }

            if (!studentID) {
                return {code: 2, message: '学号不能为空'}
            }


            const course = await this.courseService.createCourse({name, startTime, endTime, duration, openid: user.openid, studentID});

            return {code: 1, id: course._id};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '添加课程失败'};
        }
    }

    /**
     * 修改一个课程
     * @param user 用户
     * @param name 老师名字
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param duration 时长
     * @param id 课程id
     * @param studentID 学号
     */
    @Put()
    async updateOneCourse(@Body() {user, name, startTime, endTime, duration, id, studentID}:
                          {user: IUser, name: string, startTime: number, endTime: number, duration: number, id: string, studentID: string}) {
        try {
            const course = await this.courseService.updateCourse(id, {name, startTime, endTime, duration, openid: user.openid, studentID});

            return {code: 1};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '修改课程失败'};
        }
    }

    /**
     * 删除一个课程
     * @param id
     */
    @Delete()
    async deleteOneCourse(@Query() {id}: {id: string}) {
        try {
            const course = await this.courseService.deleteOne(id);

            return {code: 1};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '删除课程失败'};
        }
    }

    @Get('weeklyCurriculum')
    async getWeeklyCurriculum(@Query() {openid, startTime, endTime}: {openid: string, startTime: string, endTime: string}) {
        try {
            const start = parseInt(startTime as string);
            const end = parseInt(endTime as string);
            this.logger.warn(`开始时间: ${start}, 结束时间: ${end}`);
            return {code: 1, curriculum: await this.courseService.getWeeklyCurriculum(openid, start, end)};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '获取一周的课程失败'};
        }
    }


}