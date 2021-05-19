import {Body, Controller, Post, UseGuards, Put, Logger, Query, Get, Delete} from "@nestjs/common";
import {WeChatAuthGuard} from "../../../../../common/services/verify/wechatAuth.guard";
import {IUser} from "../../../../../common/interfaces/metaData";
import {MemorandumService} from "../../../../../common/services/memorandum/memorandum.service";

@Controller('/wechat/memorandum')
@UseGuards(WeChatAuthGuard)
export class MemorandumController {
    logger: Logger = new Logger(MemorandumController.name);
    constructor(private memorandumService: MemorandumService) {
    }

    /**
     * 添加一个备忘录
     * @param user
     * @param head 标题
     * @param type 类型
     * @param content 内容
     */
    @Post()
    async addMemorandum(@Body() {user, head, type, content}:
                        {user: IUser, head: string, type: string, content: string}) {
        try {
            const memorandum = await this.memorandumService.createMemorandum({head, type, content, openid: user.openid});

            return {code: '1', id: memorandum._id};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '添加备忘录失败'};
        }
    }

    /**
     * 修改一个备忘录
     * @param user
     * @param head 标题
     * @param type 类型
     * @param content 内容
     * @param id 备忘录id
     */
    @Put()
    async updateOneMemorandum(@Body() {user, head, type, content, id}:
                              {user: IUser, head: string, type: string, content: string, id: string}) {
        try {
            const memorandum = await this.memorandumService.updateMemorandum(id, {head, type, content, openid: user.openid});

            return {code: '1'};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '修改备忘录失败'};
        }
    }

    /**
     * 通过id获取一个备忘录
     * @param openid
     * @param id
     * @param type 获取关于类型的纪念日
     */
    @Get()
    async getMemorandum(@Query() {openid, id, type}: {openid: string, id?: string, type?: string}) {
        try {
            let memorandum;
            if (id) {
                memorandum = await this.memorandumService.getMemorandum(id);
            } else if (type) {
                memorandum = await this.memorandumService.getMemorandumByType(type);
            } else {
                return {code: '2', message: '请出入参数'};
            }

            return {code: '1', memorandum};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '获取备忘录失败'};
        }
    }

    /**
     * 删除一个备忘录
     * @param id
     */
    @Delete()
    async deleteOneMemorandum(@Body() {id}: {id: string}) {
        try {
            const memorandum = await this.memorandumService.deleteOne(id);

            return {code: '1'};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '删除备忘录失败'};
        }
    }

    /**
     * 获取普通备忘录列表
     * @param openid
     * @param page 第几页 从第一页开始
     * @param limit 一页条数
     */
    @Get('/list')
    async getMemorandumList({openid, page, limit}: {openid: string, page: string, limit: string}) {
        try {
            const _page = parseInt(page),
                _limit = parseInt(limit);

            const memorandumList = await this.memorandumService.getMemorandumList(openid, _page, _limit);
            const count = await this.memorandumService.getCount(openid);

            return {code: '1', memorandumList, count};
        } catch (e) {
            this.logger.error(`${JSON.stringify(e)}`);
            return {code: '2', message: '获取备忘录列表失败'};
        }
    }


}