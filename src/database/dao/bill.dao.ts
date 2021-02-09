import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {Bill} from "../schemas/bill.schema";
import {IBill} from "../../common/interfaces/metaData";
import {MongoDao} from "../mongoDao";
import {start} from "repl";

/**
 * 账单dao
 * @property model 数据
 */
@Injectable()
export class BillDao extends MongoDao{

    constructor(@InjectModel('bill') protected model: Model<Bill>) {
        super(model);
        this.model = model;
    }

    /**
     * 创建一个账单
     * @param bill 初始账单信息
     */
    crate(bill: IBill) {
        bill.createTime = Date.now();
        return this.model.create(bill as any);
    }


    /**
     * 获取一页 账单
     * @param openid
     * @param startTime
     * @param endTime
     * @param page
     * @param limit
     */
    getOnePage(openid: string, startTime: number, endTime: number, page: number, limit: number) {
        return this.model.find({openid, date: {$gt: startTime, $lt: endTime}}, '-__v')
            .sort({date: -1})
            .skip(limit * (page  - 1))
            .limit(limit)
            .exec();
    }

    /**
     * 获取消费总金额
     * @param openid
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    getTotalAmount(openid: string, startTime: number, endTime: number) {
        return this.model.aggregate([
            {$match: {openid, date: {$gt: startTime, $lt: endTime}}},
            {$group: {_id: null, sum: {$sum: "$amount"}}}
        ]);
    }

    /**
     * 按时间计算条数
     * @param openid
     * @param startTime
     * @param endTime
     */
    getCountByTime(openid: string, startTime: number, endTime: number) {
        return this.model.find({openid, date: {$gt: startTime, $lt: endTime}}).countDocuments();
    }

    /**
     * 删除一个账单
     * @param uuid
     */
    deleteOne(uuid: string) {
        return this.model.deleteOne({uuid}).exec();
    }

    /**
     * 移除一些账单
     * @param where
     */
    remove(where: {[key in keyof IBill]: any}) {
        return this.model.remove(where);
    }

    /**
     * 查找openid关联的账单
     * @param openid
     */
    findByOpenid(openid: string): Promise<Bill[]> {
        return this.model.find({openid}, '-__v').exec();
    }
}