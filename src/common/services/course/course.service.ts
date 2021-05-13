import {Injectable} from "@nestjs/common";
import {ICourse, IUser} from "../../interfaces/metaData";
import {CourseDao} from "../../../database/dao/course.dao";


/**
 * 课程服务
 */
@Injectable()
export class CourseService {
    constructor(private courseDao: CourseDao) {
    }

    /**
     * 创建一个课程
     * @param course
     */
    async createCourse(course: ICourse) {
        return await this.courseDao.crate(course);
    }

    /**
     * 获取一个课程
     * @param id
     */
    async getCourse(id: string) {
        return await this.courseDao.findOneById(id);
    }

    /**
     * 更新一个课程
     * @param id
     * @param course
     */
    async updateCourse(id: string, course: {[k in keyof ICourse]: any}) {
        return this.courseDao.updateOneById(id, course);
    }

    /**
     * 删除一个课程
     * @param id
     */
    async deleteOne(id: string) {
        return this.courseDao.deleteOneById(id);
    }

    /**
     * 获取一周的课程表
     * @param openid
     * @param start
     * @param end
     */
    getWeeklyCurriculum(openid: string, start: number, end: number) {
        return this.courseDao.getSortedCourses(openid, start, end);
    }
}