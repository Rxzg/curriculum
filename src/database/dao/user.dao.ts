import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {User} from "../schemas/user.schema";
import {IUser} from "../../common/interfaces/metaData";
import {MongoDao} from "../mongoDao";

/**
 * 账户管理dao
 * @property model 数据
 */
@Injectable()
export class UserDao extends MongoDao{
    constructor(@InjectModel('users') protected model: Model<User>) {
        super(model);
        this.model = model;
    }

    /**
     * 创建一个账户
     * @param user 初始账户信息
     */
    crate(user: IUser) {
        user.createTime = Date.now();
        user.lastLoginTime = Date.now();
        return this.model.create(user as any);
    }

    /**
     * 获取一页page
     * @param where
     * @param pageNum 页码
     * @param pageCount 一页数量
     */
    getOnePageAccount(where: {[key in keyof IUser]: any} | {}, pageCount: number, pageNum: number = 1) {
        return this.model.find(where)
            .sort({lastLoginTime: -1})
            .skip(pageCount * (pageNum  - 1))
            .limit(pageCount)
            .exec();
    }

    /**
     * 删除一个账户
     * @param uuid
     */
    deleteOne(uuid: string) {
        return this.model.deleteOne({uuid}).exec();
    }

    /**
     * 移除一些账户
     * @param where
     */
    remove(where: {[key in keyof IUser]: any}) {
        return this.model.remove(where);
    }

    /**
     * 查找一个
     * @param openid
     */
    findOne(openid: string): Promise<IUser> {
        return this.model.findOne({openid}, '-__v').exec();
    }

    /**
     * 获取账户的数量
     * @param where
     */
    getUsersCount(where: {[key in keyof IUser]: any}) {
        return this.model.find(where).countDocuments();
    }
}