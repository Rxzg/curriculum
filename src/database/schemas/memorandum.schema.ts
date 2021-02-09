import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IMemorandum} from "../../common/interfaces/metaData";

/**
 * 备忘录
 */
@Schema()
export class MemorandumDoc extends Document implements IMemorandum{
    // 标题
    @Prop()
    head: string;

    // 微信唯一id
    @Prop()
    openid: string;

    // 类别
    @Prop()
    type: string;

    // 内容
    @Prop()
    content: string;

    // 创建时间
    @Prop({default: Date.now})
    createTime: number | null;

    // 最后修改时间
    @Prop({default: Date.now})
    updateTime: number | null;
}

export const MemorandumSchema = SchemaFactory.createForClass(MemorandumDoc);