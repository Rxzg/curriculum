import {Prop} from "@nestjs/mongoose";

/**
 * 微信用户
 */
export interface IUser{
    _id?: string;

    // 昵称
    nickname: string;

    // 唯一id
    openid: string;

    // 创建时间
    createTime?: number;

    // 最后登录时间
    lastLoginTime?: number;
}

/**
 * 备忘录
 */
export interface IMemorandum {
    _id?: string;

    // 标题
    head: string;

    // 微信唯一id
    openid: string;

    // 类别
    type: string;

    // 内容
    content: string;

    // 创建时间
    createTime?: number;

    // 最后修改时间
    updateTime?: number;
}

/**
 * 课程
 */
export interface ICourse {
    _id?: string;

    // 老师名字
    name: string;

    // 微信唯一id
    openid: string;

    // 课程开始时间
    startTime: number;

    // 课程结束时间
    endTime: number;

    // 课程时长
    duration: number;

    // 创建时间
    createTime?: number;

    // 最后修改时间
    updateTime?: number;
}

/**
 * 账单
 */
export interface IBill {
    _id?: string;

    // 微信唯一id
    openid: string;

    // 最后登录时间
    describe: string;

    // 类比
    type: string;

    // 金额
    amount: number;

    // 创建时间
    createTime?: number;
}

/**
 * 纪念日
 */
export interface IAnniversary {
    _id?: string;

    // 标题
    head: string;

    // 微信唯一id
    openid: string;

    // 日期
    date: number;

    // 类型
    type: string;

    // 创建时间
    createTime?: number;

    // 最后修改时间
    updateTime?: number;
}

/**
 * 学生
 */
export interface IStudent {
    _id?: string;

    // 学生名字
    name: string;

    // 英文名字
    englishName: string;

    // 学号
    studentID: string;

    // 添加人di
    openid: string;

    // 创建时间
    createTime?: number;

    // 最后修改时间
    updateTime?: number;
}