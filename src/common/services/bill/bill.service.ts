import {Injectable} from "@nestjs/common";
import {IBill} from "../../interfaces/metaData";
import {BillDao} from "../../../database/dao/bill.dao";


/**
 * 账单服务
 */
@Injectable()
export class BillService {
    constructor(private billDao: BillDao) {
    }

    /**
     * 创建一个账单
     * @param bill
     */
    async createBill(bill: IBill) {
        return await this.billDao.crate(bill);
    }

    /**
     * 获取账单列表
     * @param openid 所属id
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param page 页码 从1 开始
     * @param limit 一页大小
     */
    async getBills(openid: string, startTime: number, endTime: number, page: number, limit: number) {
        if (limit > 50) {
            throw new Error('获取长的那条数超过限制');
        }

        return this.billDao.getOnePage(openid, startTime, endTime, page, limit);
    }

    /**
     * 获取总消费金额
     * @param openid
     * @param startTime
     * @param endTime
     */
    async getTotalAmount(openid: string, startTime: number, endTime: number) {
        return this.billDao.getTotalAmount(openid, startTime, endTime);
    }

    /**
     * 获取指定时间内的账单条数
     * @param openid
     * @param startTime
     * @param endTime
     */
    async getCount(openid: string, startTime: number, endTime: number) {
        return this.billDao.getCountByTime(openid, startTime, endTime);
    }


    /**
     * 删除一个账单
     * @param id
     */
    async deleteOne(id: string) {
        return this.billDao.deleteOneById(id);
    }
}