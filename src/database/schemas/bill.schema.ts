import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IBill} from "../../common/interfaces/metaData";

/**
 * 账单
 */
@Schema()
export class Bill extends Document implements IBill{
    // 微信唯一id
    @Prop()
    openid: string;

    // 最后登录时间
    @Prop()
    describe: string;

    // 类比
    @Prop()
    type: string;

    // 金额
    @Prop()
    amount: number;

    // 创建时间
    @Prop({default: Date.now})
    createTime: number;
}

export const BillSchema = SchemaFactory.createForClass(Bill);