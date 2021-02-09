import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule,
        {logger: ['error', 'warn', 'log']});
    // 设置cookie解析
    app.use(cookieParser());
    // 设置版本v1
    app.setGlobalPrefix('v1');
    // 处理跨域
    app.enableCors();
    await app.listen(4000);
}

bootstrap();
