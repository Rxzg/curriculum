import {Injectable} from "@nestjs/common";
import {IAnniversary, IUser} from "../../interfaces/metaData";
import {AnniversaryDao} from "../../../database/dao/anniversary.dao";

const ORDINARY = '1';
const SPECIAL = '2';

/**
 * 纪念日服务
 */
@Injectable()
export class AnniversaryService {
    constructor(private anniversaryDao: AnniversaryDao) {
    }

    /**
     * 创建一个纪念日
     * @param anniversary
     */
    async createAnniversary(anniversary: IAnniversary) {
        return await this.anniversaryDao.crate(anniversary);
    }

    /**
     * 获取普通纪念日列表
     * @param openid 所属id
     * @param page 页码 从1 开始
     * @param limit 一页大小
     */
    async getAnniversaryList(openid: string, page: number, limit: number) {
        if (limit > 50) {
            throw new Error('获取长的那条数超过限制');
        }

        return this.anniversaryDao.getOnePage({openid, type: ORDINARY}, page, limit);
    }

    /**
     * 更新一个纪念日
     * @param id
     * @param anniversary
     */
    async updateAnniversary(id: string, anniversary: {[k in keyof IAnniversary]: any}) {
            return this.anniversaryDao.updateOneById(id, anniversary);
    }

    /**
     * 删除一个纪念日
     * @param id
     */
    async deleteOne(id: string) {
        return this.anniversaryDao.deleteOneById(id);
    }

    /**
     * 获取纪念日
     * @param id
     */
    async getAnniversary(id: string) {
        return this.anniversaryDao.findOneById(id);
    }

    /**
     * 根据openid获取条数
     * @param openid
     */
    async getCountByOpenid(openid: string) {
        return this.anniversaryDao.getCount({openid});
    }

    /**
     * 根据类型获取一个纪念日
     * @param type
     */
    async getAnniversaryByType(type: string) {
        return this.anniversaryDao.findOne({type});
    }
}