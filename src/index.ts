#!/usr/bin/env node

import Koa from "koa";
import router from "./router/index.js";
import path from "path";
import server from "koa-static";
import { koaBody } from "koa-body";
import cors from "koa2-cors";
import error from "./error/index.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();

//捕获全局错误
app.use(error());

// 通过路由访问本地静态资源
app.use(server(path.join(__dirname + "../public")));

//允许跨域
app.use(cors());

app.use(
    koaBody({
        multipart: true,
        formLimit: 524288000,
        formidable: {
            maxFieldsSize: 2000 * 1024 * 1024,
            maxFileSize: 2000 * 1024 * 1024,
            maxTotalFileSize: 2000 * 1024 * 1024,
        },
    })
);
app.use(router.routes());

app.listen(80, () => {
    console.log("server is running http://localhost:80");
});
