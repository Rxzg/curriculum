import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IStudent} from "../../common/interfaces/metaData";

/**
 * 微信用户
 */
@Schema()
export class Student extends Document implements IStudent{
    // 名字
    @Prop()
    name: string;

    // 学号
    @Prop()
    studentID: string;

    // 英文名
    @Prop()
    englishName: string;

    // 创建人id
    @Prop()
    openid: string;

    // 创建时间
    @Prop({default: Date.now})
    createTime: number;

    // 最后登录时间
    @Prop()
    lastLoginTime: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);