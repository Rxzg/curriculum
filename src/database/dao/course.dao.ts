import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {Course} from "../schemas/course.schema";
import {ICourse} from "../../common/interfaces/metaData";
import {MongoDao} from "../mongoDao";

/**
 * 课程dao
 * @property model 数据
 */
@Injectable()
export class CourseDao extends MongoDao{

    constructor(@InjectModel('course') protected model: Model<Course>) {
        super(model);
        this.model = model;
    }

    /**
     * 创建一个课程
     * @param course 初始课程信息
     */
    crate(course: ICourse) {
        course.createTime = Date.now();
        return this.model.create(course as any);
    }

    /**
     * 通过id修改课程
     * @param id
     * @param course
     */
    updateOneById(id: string, course: ICourse) {
        return this.model.updateOne({_id: id}, course)
    }

    /**
     * 获取一页page 课程
     * @param where
     * @param pageNum 页码
     * @param pageCount 一页数量
     */
    getOnePageAccount(where: {[key in keyof ICourse]: any} | {}, pageCount: number, pageNum: number = 1) {
        return this.model.find(where, '-__v')
            .sort({createTime: -1})
            .skip(pageCount * (pageNum  - 1))
            .limit(pageCount)
            .exec();
    }

    /**
     * 获取排序后的课程
     * @param openid
     * @param start
     * @param end
     */
    getSortedCourses(openid: string, start: number, end: number) {
        let startTime = {$gt: start};
        if (end !== undefined) {
            startTime["$lt"] = end;
        }

        return this.model.find({openid, startTime})
            .sort({startTime: 1})
            .exec();
    }

    /**
     * 获取所属老师下指定学生的课程表
     * @param openid 老师的id
     * @param start 开始时间
     * @param end 结束时间
     * @param studentID
     */
    getStudentCurriculum(openid: string, studentID: string, start: number, end: number) {
        let startTime = {$gt: start};
        if (end !== undefined) {
            startTime["$lt"] = end;
        }

        return this.model.find({openid, studentID, startTime})
            .sort({startTime: 1})
            .exec();
    }

    /**
     * 移除一些课程
     * @param where
     */
    remove(where: {[key in keyof ICourse]: any}) {
        return this.model.remove(where);
    }

    /**
     * 查找openid关联的课程
     * @param openid
     */
    findByOpenid(openid: string): Promise<Course[]> {
        return this.model.find({openid}, '-__v').exec();
    }
}