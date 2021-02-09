import {Body, Controller, Post, UseGuards, Put, Logger, Query, Get, Delete} from "@nestjs/common";
import {WeChatAuthGuard} from "../../../../../common/services/verify/wechatAuth.guard";
import {IUser} from "../../../../../common/interfaces/metaData";
import {BillService} from "../../../../../common/services/bill/bill.service";

@Controller('/wechat/bill')
@UseGuards(WeChatAuthGuard)
export class BillController {
    logger: Logger = new Logger(BillController.name);
    constructor(private billService: BillService) {
    }


    /**
     * 添加一个账单
     * @param user
     * @param describe  账单描述
     * @param type  类型
     * @param amount 金额
     * @param date 日期
     */
    @Post()
    async addBill(@Body() {user, describe, type, amount, date}:
                        {user: IUser, describe: string, type: string, amount: number, date: number}) {
        try {
            const bill = await this.billService.createBill({ describe, type, amount, openid: user.openid});

            return {code: 1, id: bill._id};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '添加账单失败'};
        }
    }

    /**
     * 获取账单列表
     * @param openid 玩家id
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param page 页码
     * @param limit 一页条数
     */
    @Get('/list')
    async getBills(@Query() {openid, startTime, endTime, page, limit}:
                 {openid: string, startTime: string, endTime: string, page: string, limit: string}) {
        try {
            const _startTime = parseInt(startTime),
                _endTime = parseInt(endTime),
                _page = parseInt(page),
                _limit = parseInt(limit);

            const bills = await this.billService.getBills(openid, _startTime, _endTime, _page, _limit);
            const count = await this.billService.getCount(openid, _startTime, _endTime);

            return {code: 1, bills, count};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '获取账单列表失败'};
        }
    }

    /**
     * 获取消费总额
     * @param openid
     * @param startTime
     * @param endTime
     */
    @Get('/totalAmount')
    async getTotalAmount(@Query() {openid, startTime, endTime}:
                       {openid: string, startTime: string, endTime: string}) {
        try {
            const _startTime = parseInt(startTime),
                _endTime = parseInt(endTime);

            const result = await this.billService.getTotalAmount(openid, _startTime, _endTime);
            console.warn(result)

            return {code: 1, sum: result[0].sum};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '获取消费总额失败'};
        }
    }


    /**
     * 删除一个账单
     * @param id
     */
    @Delete()
    async deleteOneBill(@Query() {id}: {id: string}) {
        try {
            const bill = await this.billService.deleteOne(id);

            return {code: 1};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: 2, message: '删除账单失败'};
        }
    }
}