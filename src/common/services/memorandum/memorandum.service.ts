import {Injectable} from "@nestjs/common";
import {IMemorandum, IUser} from "../../interfaces/metaData";
import {MemorandumDao} from "../../../database/dao/memorandum.dao";


/**
 * 备忘录服务
 */
@Injectable()
export class MemorandumService {
    constructor(private memorandumDao: MemorandumDao) {
    }

    /**
     * 创建一个备忘录
     * @param memorandum
     */
    async createMemorandum(memorandum: IMemorandum) {
        return await this.memorandumDao.crate(memorandum);
    }

    /**
     * 获取备忘录列表
     * @param openid 所属id
     * @param page 页码 从1 开始
     * @param limit 一页大小
     */
    async getMemorandumList(openid: string, page: number, limit: number) {
        if (limit > 20) {
            throw new Error('获取长的那条数超过限制');
        }

        return this.memorandumDao.getOnePage(openid, page, limit);
    }

    /**
     * 更新一个备忘录
     * @param id
     * @param memorandum
     */
    async updateMemorandum(id: string, memorandum: {[k in keyof IMemorandum]: any}) {
        return this.memorandumDao.updateOneById(id, memorandum);
    }

    /**
     * 删除一个备忘录
     * @param id
     */
    async deleteOne(id: string) {
        return this.memorandumDao.deleteOneById(id);
    }

    /**
     * 获取备忘录
     * @param id
     */
    async getMemorandum(id: string) {
        return this.memorandumDao.findOneById(id);
    }

    /**
     * 根据类型获取备忘录
     * @param type
     */
    async getMemorandumByType(type: string) {
        return this.memorandumDao.findOne({type});
    }

    /**
     * 获取指定时间内的账单条数
     * @param openid
     */
    async getCount(openid: string) {
        return this.memorandumDao.getCount({openid});
    }
}