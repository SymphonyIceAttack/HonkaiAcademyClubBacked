import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import jwt from "jwt-simple";
import { secret } from "../Login/index.js";
import { nanoid } from "nanoid";
const prisma = new PrismaClient();
const ValidateUser = new Router();

ValidateUser.post("/", (ctx) => {
    const Authorization = ctx.get("authorization");
    const [, token] = Authorization.split(" ");
    if (token) {
        try {
            const r = jwt.decode(token, secret);
            ctx.body = {
                status: 200,
                account: r,
                token,
            };
        } catch (e) {
            ctx.body = {
                status: 401,
                data: "没有登陆",
                account: nanoid(),
            };
        }
    } else {
        ctx.body = {
            status: 401,
            data: "没有登陆",
            account: nanoid(),
        };
    }
});
export default ValidateUser;
