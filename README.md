
<h1><p align="center">课时表接口文档</p></h1>

##目录
*   1.[接口](#0)
    *    1.1 [登录](#1)
    *    1.2 [添加课程](#2)
    *    1.3 [修改课程](#3)
    *    1.4 [删除课程](#4)
    *    1.5 [获取一周课程](#5)
    *    1.6 [添加账单](#6)
    *    1.7 [获取账单](#7)
    *    1.7.1 [获取消费总额](#7.1)
    *    1.8 [添加备忘录](#8)
    *    1.9 [获取单个备忘录](#9)
    *    1.10 [获取多个备忘录](#10)
    *    1.11 [修改备忘录](#11)
    *    1.12 [删除备忘录](#12)
    *    1.13 [添加纪念日](#13)
    *    1.14 [获取单个纪念日](#14)
    *    1.15 [获取多个纪念日](#15)
    *    1.16 [修改纪念日](#16)
    *    1.17 [删除纪念日](#17)
*   2.[数据表](#18)
    *    2.1 [用户/User](#19)
    *    2.2 [课程/Course](#20)
    *    2.3 [账单/Bill](#21)
    *    2.4 [备忘录/Memorandum](#22)
    *    2.5 [纪念日/Anniversary](#23)


<h2 id="0">主要接口说明</h2>
<h3 id="1">登录</h3>
```js
    # 方法/路径
    POST  /v1/wechat/login

    # 格式
    Content-Type / "application/json"

    # 请求包
    {
        # 用户临时id
        code: string;
        # 用户昵称
        nickname: string;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        #用户
        user: User;
        #token
        token: string;
        #seesion用来解密数据用
        session_key: string;        
    }
```
<h3 id="2">添加课程</h3>
```js
    # 方法/路径
    POST  /v1/wechat/course

    # 格式
    Content-Type / "application/json"

    # 请求包
    {
        # 老师名字
        name: string;
        # 开始时间
        startTime: number;
        # 结束时间
        endTime: number;
        # 时长
        duration: number;
    }

    # 返回包
    200/OK 
    {
        # 状态码
        code: 1;
        # 课程id
        id: string;
    }
```
<h3 id="3">修改课程</h3>
```js
    # 方法/路径
    PUT  /v1/wechat/course

    # 格式
    Content-Type / "application/json"
    
    # 请求包
    {
        # 课程id
        id: string;
        # 老师名字
        name: string;
        # 开始时间
        startTime: number;
        # 结束时间
        endTime: number;
        # 时长
        duration: number;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
    }
```
<h3 id="4">删除课程</h3>
```js
    # 方法/路径
    DELETE  /v1/wechat/course

    # 格式
    Content-Type / "application/json"
    
    # 请求包
    {
        # 课程ID
        id: string;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
    }
```
<h3 id="5">获取一周课程</h3>
```js
    # 方法/路径
    GET  /v1/wechat/course/weeklyCurriculum?"startTime=<开始时间>":


    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        # 课程数组
        curriculum:[...Course];
    }
```
<h3 id="6">添加账单</h3>
```js
    # 方法/路径
    POST  /v1/wechat/bill

    # 格式
    Content-Type / "application/json"

    # 请求包
    {
        # 描述
        describe: string;
        # 类别
        type: number;
        # 金额
        amount: number;
        # 日期
        date: number;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        # 账单id
        id: string;
    }
```
<h3 id="7">获取账单</h3>
```js
    # 方法/路径
    GET  /v1/wechat/bill/list?"startTime=<开始时间>&endTime=<结束时间>&page=<页码>&limit=<一页的大小>":

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        #账单
        bills: [...Bill];
        #总条数
        count: number;
    }
```
<h3 id="7.1">获取消费总额</h3>
```js
    # 方法/路径
    GET  /v1/wechat/bill/totalAmount?"startTime=<开始时间>&endTime=<结束时间>":

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        #消费总额
        sum: number;
    }
```
<h3 id="8">添加备忘录</h3>
```js
    # 方法/路径
    POST  /v1/wechat/memorandum

    # 格式
    Content-Type / "application/json"

    # 请求包
    {
        # 标题
        head: string;
        # 类别
        type: number;
        # 内容
        content: number;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        # 备忘录
        id: string;
    }
```
<h3 id="9">获取单个备忘录</h3>
```js
    # 方法/路径
    GET  /v1/wechat/memorandum?"id=<单个备忘录id>":

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        memorandum: Memorandum
    }
```
<h3 id="10">获取多个备忘录</h3>
```js
    # 方法/路径
    GET  /v1/wechat/memorandum/list?"page=<第几页>&limit=<一页的大小>":

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        memorandums: [...Memorandum]
    }
```
<h3 id="11">修改备忘录</h3>
```js
    # 方法/路径
    PUT  /v1/wechat/memorandum

    # 格式
    Content-Type / "application/json"
    
    # 请求包
    {
        # 备忘录ID
        id: string;
        # 标题
        head: string;
        # 类别
        type: number;
        # 内容
        content: number;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
    }
```
<h3 id="12">删除备忘录</h3>
```js
    # 方法/路径
    DELETE  /v1/wechat/memorandum

    # 格式
    Content-Type / "application/json"
    
    # 请求包
    {
        # 备忘录ID
        id: string;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
    }
```
<h3 id="13">添加纪念日</h3>
```js
    # 方法/路径
    POST  /v1/wechat/anniversary

    # 格式
    Content-Type / "application/json"

    # 请求包
    {
        # 标题
        head: string;
        # 日期
        date: number;
        # 类别/置顶/不置顶
        type: number;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        # 备忘录
        id: string;
    }
```
<h3 id="14">获取单个纪念日</h3>
```js
    # 方法/路径
    GET  /v1/wechat/anniversary?"id=<纪念日id>":
    GET  /v1/wechat/anniversary?"type=<纪念日类型>":

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        anniversary: Anniversary
    }
```
<h3 id="15">获取多个纪念日</h3>
```js
    # 方法/路径
    GET  /v1/wechat/anniversary/list?"page=<第几页>&limit=<一页的大小>":

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
        anniversaries: [...Anniversary]
    }
```
<h3 id="16">修改纪念日</h3>
```js
    # 方法/路径
    PUT  /v1/wechat/anniversary

    # 格式
    Content-Type / "application/json"
    
    # 请求包
    {
        # 用户临时id
        id: string;
        # 标题
        head: string;
        # 日期
        date: number;
        # 类别
        type: number;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
    }
```
<h3 id="17">删除纪念日</h3>
```js
    # 方法/路径
    DELETE  /v1/wechat/anniversary

    # 格式
    Content-Type / "application/json"
    
    # 请求包
    {
        # 纪念日ID
        id: string;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
    }
```
<h3 id="17.1">纪念日置顶</h3>
```js
    # 方法/路径
    PUT  /v1/wechat/anniversary/placedTop

    # 格式
    Content-Type / "application/json"
    
    # 请求包
    {
        # 纪念日ID
        id: string;
    }

    # 返回包
    200/OK 
    {
        #状态码
        code: 1;
    }
```
<h2 id="18">数据表</h2>
<h3 id="19">用户/User</h3>
```js
    {
        # 微信id
        openid: string;
        nickname: string;
        createTime: number;
        # 最后登录时间
        lastLoginTime: number;
    }
```
<h3 id="20">课程/Course</h3>
```js
    {
        # 唯一id
        id: string;
        # 创建人id
        openid: string;
        # 老师名字
        name: string;
        # 开始时间
        startTime: number;
        # 结束时间
        endTime: number;
        # 时长
        duration: number;
        # 创建时间
        createTime: number;
        # 修改时间
        updateTime: number;
    }
```
<h3 id="21">账单/Bill</h3>
```js
    {
        # 唯一id
        id: string;
        # 创建人id
        openid: string;
        # 描述
        describe: string;
        # 类别
        type: number;
        # 金额
        amount: number;
        # 日期
        date: number;
        # 创建时间
        createTime: number;
        # 修改时间
        updateTime: number;
    }
```
<h3 id="22">备忘录/Memorandum</h3>
```js
    {
        # 唯一id
        id: string;
        # 创建人id
        openid: string;
        # 标题
        head: string;
        # 类别
        type: number;
        # 内容
        content: number;
        # 创建时间
        createTime: number;
        # 修改时间
        updateTime: number;
    }
```
<h3 id="23">纪念日/Anniversary</h3>
```js
    {
        # 唯一id
        id: string;
        # 创建人id
        openid: string;
        # 标题
        head: string;
        # 日期
        date: number;
        # 类别
        type: number;
        # 创建时间
        createTime: number;
        # 修改时间
        updateTime: number;
    }
```
