import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";

/**
 * mongoDAO基类
 * @property model 数据
 */
@Injectable()
export abstract class MongoDao {
    protected abstract model: Model<any>;
    protected constructor(model: Model<any>) {}

    /**
     * 创建一个账户
     * @param metadata 初始账户信息
     */
    crate(metadata: any) {
        return this.model.create(metadata);
    }

    /**
     * 删除一个账户
     * @param where 删除条件
     */
    deleteOne(where: any) {
        return this.model.deleteOne(where).exec();
    }

    /**
     * 移除一些账户
     * @param where
     */
    remove(where: any) {
        return this.model.remove(where);
    }

    /**
     * 查找一个
     * @param where
     */
    findOne(where: any): Promise<any> {
        return this.model.findOne(where, '-_id -__v').exec();
    }

    /**
     * 通过id查找
     * @param id
     */
    findOneById(id: string): Promise<any> {
        return this.model.findOne({_id: id}, '-__v').exec();
    }

    /**
     * 更新
     * @param where
     * @param updates
     */
    update(where, updates) {
        return this.model.update(where, updates).exec();
    }

    /**
     * 更新
     * @param where
     * @param updates
     */
    updateOne(where, updates) {
        return this.model.updateOne(where, updates).exec();
    }

    /**
     * 获取指定条件文档的数量
     * @param where
     */
    getCount(where) {
        return this.model.find(where).countDocuments();
    }

    /**
     * 通过id删除一条数据
     * @param id
     */
    deleteOneById(id: string) {
        return this.model.deleteOne({_id: id}).exec();
    }
}