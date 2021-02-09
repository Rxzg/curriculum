import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {Anniversary} from "../schemas/anniversary.schema";
import {IAnniversary, IMemorandum} from "../../common/interfaces/metaData";
import {MongoDao} from "../mongoDao";

/**
 * 纪念日dao
 * @property model 数据
 */
@Injectable()
export class AnniversaryDao extends MongoDao{
    constructor(@InjectModel('anniversary') protected model: Model<Anniversary>) {
        super(model);
        this.model = model;
    }

    /**
     * 创建一个纪念日
     * @param anniversary 初始纪念日信息
     */
    crate(anniversary: IAnniversary) {
        anniversary.createTime = Date.now();
        return this.model.create(anniversary as any);
    }

    /**
     * 通过id修改备忘录
     * @param id
     * @param anniversary
     */
    updateOneById(id: string, anniversary: IAnniversary) {
        return this.model.updateOne({_id: id}, anniversary)
    }

    /**
     * 获取一页page 纪念日
     * @param where
     * @param page 页码
     * @param limit 一页数量
     */
    getOnePage(where: {[key: string]: any}, page: number, limit: number, ) {
        return this.model.find(where)
            .sort({createTime: -1})
            .skip(limit * (page  - 1))
            .limit(limit)
            .exec();
    }

    /**
     * 删除一个纪念日
     * @param uuid
     */
    deleteOne(uuid: string) {
        return this.model.deleteOne({uuid}).exec();
    }

    /**
     * 移除一些纪念日
     * @param where
     */
    remove(where: {[key in keyof IAnniversary]: any}) {
        return this.model.remove(where);
    }

    /**
     * 查找openid关联的纪念日
     * @param openid
     */
    findByOpenid(openid: string): Promise<Anniversary[]> {
        return this.model.find({openid}, '-__v').exec();
    }
}