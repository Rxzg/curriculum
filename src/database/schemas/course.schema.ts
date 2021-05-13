import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ICourse} from "../../common/interfaces/metaData";

/**
 * 课程
 */
@Schema()
export class Course extends Document implements ICourse{
    // 学生名字
    @Prop()
    name: string;

    // 微信唯一id
    @Prop()
    openid: string;

    // 课程开始时间
    @Prop()
    startTime: number;

    // 课程结束时间
    @Prop()
    endTime: number;

    // 学号
    @Prop()
    studentID: string;

    // 课程时长
    @Prop()
    duration: number;

    // 创建时间
    @Prop({default: Date.now})
    createTime: number;

    // 最后修改时间
    @Prop({default: Date.now})
    updateTime: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);