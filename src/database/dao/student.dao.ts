import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {Student} from "../schemas/Student.schema";
import {IStudent} from "../../common/interfaces/metaData";
import {MongoDao} from "../mongoDao";

/**
 * 账户管理dao
 * @property model 数据
 */
@Injectable()
export class StudentDao extends MongoDao{
    constructor(@InjectModel('student') protected model: Model<Student>) {
        super(model);
        this.model = model;
    }

    /**
     * 创建一个账户
     * @param student 初始账户信息
     */
    crate(student: IStudent) {
        student.createTime = Date.now();
        student.updateTime = Date.now();
        return this.model.create(student as any);
    }

    /**
     * 更新一个学生
     * @param where
     * @param student
     */
    async updateOne(where: {studentID: string}, student: IStudent) {
        student.updateTime = Date.now();
        return this.model.updateOne(where, student);
    }

    /**
     * 获取一页page
     * @param where
     * @param pageNum 页码
     * @param pageCount 一页数量
     */
    getOnePageAccount(where: {[key in keyof IStudent]: any} | {}, pageCount: number, pageNum: number = 1) {
        return this.model.find(where)
            .sort({createTime: -1})
            .skip(pageCount * (pageNum  - 1))
            .limit(pageCount)
            .exec();
    }

    /**
     * 删除一个学生
     * @param studentID
     */
    deleteOne(studentID: string) {
        return this.model.deleteOne({studentID}).exec();
    }

    /**
     * 移除一些账户
     * @param where
     */
    remove(where: {[key in keyof IStudent]: any}) {
        return this.model.remove(where);
    }

    /**
     * 查找一个
     * @param studentID
     */
    findOne(studentID: string): Promise<IStudent> {
        return this.model.findOne({studentID}, '-__v').exec();
    }

    /**
     * 获取账户的数量
     * @param where
     */
    getStudentsCount(where: {[key in keyof IStudent]: any} | {}) {
        return this.model.find(where).countDocuments();
    }

    getAllByOpenid(openid: string) {
        return this.model.find({openid});
    }
}