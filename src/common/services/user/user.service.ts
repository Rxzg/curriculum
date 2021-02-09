import {Injectable} from "@nestjs/common";
import {UserDao} from "../../../database/dao/user.dao";
import {IUser} from "../../interfaces/metaData";

interface CreateUserDto {
    // 昵称
    nickname: string;

    // 微信唯一id
    openid: string;
}

@Injectable()
export class UserService {
    constructor(private userDao: UserDao) {
    }

    /**
     * 创建一个账户
     * @param createUserDto
     */
    async create(createUserDto: CreateUserDto) {
        const user: IUser = {
            nickname: createUserDto.nickname,
            openid: createUserDto.openid,
        };

        return await this.userDao.crate(user);
    }

    /**
     * 查找一个账户
     * @param openid
     */
    async getUserByOpenid(openid: string) {
        return await this.userDao.findOne(openid);
    }


    /**
     * 获取玩家
     * @param pageNum
     * @param pageCount
     */
    async getUsers(pageNum: number, pageCount: number) {
        const accounts = await this.userDao.getOnePageAccount({}, pageCount, pageNum);
        const count = 0

        // 所有数据
        return {accounts, count};
    }

    /**
     * 更新最后登录时间
     * @param user
     */
    async updateLastLoginTime(user: IUser) {
        user.lastLoginTime = Date.now();
        await this.userDao.updateOne({openid: user.openid}, {lastLoginTime: user.lastLoginTime});
        return user;
    }
}