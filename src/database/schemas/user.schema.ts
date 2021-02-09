import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IUser} from "../../common/interfaces/metaData";

/**
 * 微信用户
 */
@Schema()
export class User extends Document implements IUser{
    // 昵称
    @Prop()
    nickname: string;

    // 微信唯一id
    @Prop()
    openid: string;

    // 创建时间
    @Prop({default: Date.now})
    createTime: number;

    // 最后登录时间
    @Prop()
    lastLoginTime: number;
}

export const UserSchema = SchemaFactory.createForClass(User);