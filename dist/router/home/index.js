import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const home = new Router();
home.get("/", async (ctx) => {
    ctx.body = "页";
    console.log(ctx.request.body);
});
home.get("/banner", async (ctx) => {
    const res = await prisma.user.findMany();
});
home.get("/footer", (ctx) => {
    ctx.body = "首页-底部";
});
export default home;
//# sourceMappingURL=index.js.map