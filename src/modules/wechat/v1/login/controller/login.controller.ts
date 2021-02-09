import {Body, Controller, Get, Post, HttpService, Response} from "@nestjs/common";
import {LoginService} from "../services/login.service";
import {AuthService} from "../../../../../common/services/verify/auth.service";
import {UserService} from "../../../../../common/services/user/user.service";
// const weChatApp = require('../../../../../../../config/wechatAppId.json');

@Controller('wechat/login')
export class LoginController {

    constructor(private loginService: LoginService,
                private authService: AuthService,
                private userService: UserService,
                private httpService: HttpService) {

    }

    /**
     * 登录
     */
    @Post()
    async login(@Body() {code, nickname}: {code: string, nickname: string}, @Response() res) {

        // 请求获取唯一id
        // const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${weChatApp.id}&secret=${weChatApp.secret}&js_code=${code}&grant_type=authorization_code`;
        // const result: any = (await this.httpService.get(url).toPromise()).data;
        const result = {openid: '222222', session_key: '234r243'};

        if (!result.openid) {
            return {code: 500, message: '登录失败'};
        }

        let user = await this.userService.getUserByOpenid(result.openid);

        // 查看用户是否存在
        if (!user) {
            user = await this.userService.create({
                nickname, openid: result.openid
            });
        } else {
            // 更新最后一次登录时间
            user = await this.userService.updateLastLoginTime(user);
        }

        const token = this.authService.genWeChatToken(user.openid);
        // 设置token
        res.cookie('token', token);
        return res.send({user, session_key: result.session_key});

        // return {user, session_key: result.session_key};
    }
}