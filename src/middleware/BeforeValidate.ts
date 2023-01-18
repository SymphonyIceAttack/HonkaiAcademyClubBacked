import type Koa from "koa";
import jwt from "jwt-simple";
import getSerect from "../utils/getSerect";
import { nanoid } from "nanoid";

const allowpage = [
    "/home",
    "/login",
    "/register",
    "/validateBackedUrl",
    "/ValidateUser",
];
export const BeforeValidate: Koa.Middleware<
    Koa.DefaultState,
    Koa.DefaultContext,
    any
> = async (ctx, next) => {
    const index = ctx.originalUrl.indexOf("?");
    const url =
        index === -1 ? ctx.originalUrl : ctx.originalUrl.slice(0, index);

    if (allowpage.indexOf(url) > -1) {
        await next();
        return;
    } else {
        const Authorization = ctx.get("authorization");
        const [, token] = Authorization.split(" ");

        try {
            const query = ctx.request.query as {
                account: string;
            };
            const account = jwt.decode(token, getSerect());

            if (query.account !== account) {
                throw new Error("没有权限");
            }
            await next();
        } catch (e) {
            console.log(e);

            ctx.body = {
                status: 401,
                data: "没有权限",
                account: nanoid(),
            };
        }
        return;
    }
};
