import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IAnniversary} from "../../common/interfaces/metaData";

/**
 * 纪念日
 */
@Schema()
export class Anniversary extends Document implements IAnniversary{
    // 标题
    @Prop()
    head: string;

    // 微信唯一id
    @Prop()
    openid: string;

    // 日期
    @Prop()
    date: number;

    // 类型
    @Prop()
    type: string;

    // 创建时间
    @Prop({default: Date.now})
    createTime: number;

    // 最后修改时间
    @Prop({default: Date.now})
    updateTime: number;
}

export const AnniversarySchema = SchemaFactory.createForClass(Anniversary);