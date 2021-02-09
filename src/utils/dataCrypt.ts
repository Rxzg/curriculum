import {createDecipheriv} from 'crypto';

const appId = require('../../../config/wechatAppId.json').id;

class WXBizDataCrypt {
    sessionKey: string;

    constructor(sessionKey) {
        this.sessionKey = sessionKey;
    }

    decryptData(encryptedData, iv) {
        // base64 decode
        const sessionKey = new Buffer(this.sessionKey, 'base64');
        encryptedData = new Buffer(encryptedData, 'base64');
        iv = new Buffer(iv, 'base64');

        // 解密
        const decipher = createDecipheriv('aes-128-cbc', sessionKey, iv);
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true);
        let decoded: any = decipher.update(encryptedData, 'binary', 'utf8');
        decoded += decipher.final('utf8');

        decoded = JSON.parse(decoded);

        if (decoded.watermark.appid !== appId) {
            throw new Error('Illegal Buffer')
        }

        return decoded
    }
}

/**
 * 解密
 * @param sessionKey
 * @param encryptedData
 * @param iv 初始向量
 */
export function decode(sessionKey, encryptedData, iv) {
    const pc = new WXBizDataCrypt(sessionKey);

    return pc.decryptData(encryptedData, iv);
}