import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import jwt from "jwt-simple";
import getSerect from "../../utils/getSerect.js";
const prisma = new PrismaClient();
const Login = new Router();

Login.post("/", async (ctx) => {
    const query = ctx.request.query as {
        account: string;
        password: string;
    };
    const user = await prisma.user.findMany({
        where: {
            account: query.account,
            password: query.password,
        },
    });
    if (user.length === 1) {
        const token = jwt.encode(query.account, getSerect());
        ctx.body = {
            status: 200,
            msg: "Ok",
            token: token,
        };
    } else {
        ctx.body = {
            status: 205,
            msg: "None",
            token: "",
        };
    }
});

export default Login;
