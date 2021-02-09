import {Body, Controller, Post, UseGuards, Put, Logger, Query, Get, Delete} from "@nestjs/common";
import {WeChatAuthGuard} from "../../../../../common/services/verify/wechatAuth.guard";
import {IUser} from "../../../../../common/interfaces/metaData";
import {AnniversaryService} from "../../../../../common/services/anniversary/anniversary.service";

@Controller('/wechat/anniversary')
@UseGuards(WeChatAuthGuard)
export class AnniversaryController {
    logger: Logger = new Logger(AnniversaryController.name);

    constructor(private anniversaryService: AnniversaryService) {
    }

    /**
     * 添加一个纪念日
     * @param user
     * @param head 标题
     * @param type 类型
     * @param content 内容
     */
    @Post()
    async addAnniversary(@Body() {user, head, type, date}:
                             { user: IUser, head: string, date: string, type: string }) {
        try {
            const anniversary = await this.anniversaryService.createAnniversary({
                head,
                type,
                date: parseInt(date),
                openid: user.openid
            });

            return {code: '1', id: anniversary._id};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '添加纪念日失败'};
        }
    }

    /**
     * 修改一个纪念日
     * @param user
     * @param head 标题
     * @param type 类型
     * @param content 内容
     * @param id 纪念日id
     */
    @Put()
    async updateOneAnniversary(@Body() {user, head, type, date, id}:
                                   { user: IUser, head: string, date: string, type: string, id: string }) {
        try {
            const anniversary = await this.anniversaryService.updateAnniversary(id, {
                head,
                type,
                date: parseInt(date),
                openid: user.openid
            });

            return {code: '1'};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '修改纪念日失败'};
        }
    }

    /**
     * 通过id或者type获取一个纪念日
     * @param openid
     * @param id
     * @param type
     */
    @Get()
    async getAnniversary(@Query() {openid, id, type}: {openid: string, id?: string, type?: string}) {
        try {
            let memorandum;
            if (id) {
                memorandum = await this.anniversaryService.getAnniversary(id);
            } else if (type) {
                memorandum = await this.anniversaryService.getAnniversaryByType(type);
            } else {
                return {code: '2', message: '请出入参数'};
            }

            return {code: '1', memorandum};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '获取纪念日失败'};
        }
    }

    /**
     * 删除一个纪念日
     * @param id
     */
    @Delete()
    async deleteOneAnniversary(@Query() {id}: { id: string }) {
        try {
            const anniversary = await this.anniversaryService.deleteOne(id);

            return {code: '1'};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '删除纪念日失败'};
        }
    }

    /**
     * 获取纪念日列表
     * @param openid
     * @param page 第几页 从第一页开始
     * @param limit 一页条数
     */
    @Get('/list')
    async getAnniversaryList({openid, page, limit}: { openid: string, page: string, limit: string }) {
        try {
            const _page = parseInt(page),
                _limit = parseInt(limit);

            const anniversaryList = await this.anniversaryService.getAnniversaryList(openid, _page, _limit);
            const count = await this.anniversaryService.getCountByOpenid(openid);

            return {code: '1', anniversaryList, count};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '获取纪念日列表失败'};
        }
    }

    /**
     * 置顶纪念日
     * @param openid
     * @param id
     */
    @Put('/placedTop')
    async placedTop({openid, id}: { openid: string, id: string }) {
        try {
            const anniversary = await this.anniversaryService.getAnniversary(id);

            if (anniversary.type === '2') {
                return {code: '1'};
            }

            const first = await this.anniversaryService.getAnniversaryByType('2');
            if (first) {
                first.type = '1';
                await this.anniversaryService.updateAnniversary(first._id, first);
            }
            anniversary.type = '2';
            await this.anniversaryService.updateAnniversary(anniversary._id, anniversary);

            return {code: 1};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '置顶纪念日失败'};
        }
    }
}