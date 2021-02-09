import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {MemorandumDoc} from "../schemas/memorandum.schema";
import {IMemorandum} from "../../common/interfaces/metaData";
import {MongoDao} from "../mongoDao";

/**
 * 备忘录dao
 * @property model 数据
 */
@Injectable()
export class MemorandumDao extends MongoDao{
    constructor(@InjectModel('memorandum') protected model: Model<MemorandumDoc>) {
        super(model);
        this.model = model;
    }

    /**
     * 创建一个备忘录
     * @param memorandum 初始备忘录信息
     */
    crate(memorandum: IMemorandum) {
        memorandum.createTime = Date.now();
        return this.model.create(memorandum as any);
    }

    /**
     * 通过id修改备忘录
     * @param id
     * @param memorandum
     */
    updateOneById(id: string, memorandum: IMemorandum) {
        return this.model.updateOne({_id: id}, memorandum)
    }

    /**
     * 获取一页page 备忘录
     * @param openid 
     * @param page 页码
     * @param limit 一页数量
     */
    getOnePage(openid: string, page: number, limit: number = 1) {
        return this.model.find({openid}, '-__v')
            .sort({createTime: -1})
            .skip(limit * (page  - 1))
            .limit(limit)
            .exec();
    }

    /**
     * 删除一个备忘录
     * @param uuid
     */
    deleteOne(uuid: string) {
        return this.model.deleteOne({uuid}).exec();
    }

    /**
     * 移除一些备忘录
     * @param where
     */
    remove(where: {[key in keyof IMemorandum]: any}) {
        return this.model.remove(where);
    }

    /**
     * 查找openid关联的备忘录
     * @param openid
     */
    findByOpenid(openid: string): Promise<MemorandumDoc[]> {
        return this.model.find({openid}, '-__v').exec();
    }
}