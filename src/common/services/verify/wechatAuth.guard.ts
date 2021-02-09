import {ExecutionContext, CanActivate, Injectable, UnauthorizedException} from "@nestjs/common";
import {verify} from "jsonwebtoken";
import {secret, weChatSecret} from "./constants";
import {UserService} from "../user/user.service";
import {IUser} from "../../interfaces/metaData";

/**
 * token验证器
 */
@Injectable()
export class WeChatAuthGuard implements CanActivate{
    constructor(private userService: UserService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 获取请求
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    /**
     * 验证请求
     * @param request
     */
    private async validateRequest(request): Promise<boolean> {

        if (!request.cookies || !request.cookies.token) {
            throw new UnauthorizedException('未登录');
        }


        let token = request.cookies.token;

        console.log('请求token', token);

        if (token) {
            let decoded: any;
            try {
                // 解码结果
                decoded = verify(token, weChatSecret);
            } catch (e) {
                throw new UnauthorizedException('未登录');
            }
            // 查找数据库
            const user  = await this.userService.getUserByOpenid(decoded.openid);

            if (user) {
                this.bindAccount(request, user);
                return true;
            }
        }

        throw new UnauthorizedException('未登录');
    }

    /**
     * 绑定操作人
     * @param request
     * @param user
     */
    private bindAccount(request, user: IUser) {
        if (request.method === 'GET' || request.method === 'DELETE') {
            request.query.openid = user.openid;
        } else if (request.method === 'POST' || request.method === 'PUT') {
            request.body.user = user;
        }
    }
}