import {Injectable} from "@nestjs/common";
import {sign} from "jsonwebtoken";
import {secret, weChatSecret} from "./constants";

@Injectable()
export class AuthService {
    /**
     * 生成后台token
     * @param id
     */
    genToken(id: any) {
        // 生成token
        return sign({accountId: id}, secret, {expiresIn: 60 * 720});
    }

    /**
     * 生成后台token
     * @param id
     */
    genWeChatToken(id: any) {
        // 生成token
        return sign({openid: id}, weChatSecret, {expiresIn: 60 * 1440 * 20});
    }
}