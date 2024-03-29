import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
const prisma = new PrismaClient();
const nanoid = customAlphabet("QWERTYUIOPASDFGHJKLZXCVBNM123456789", 8);
export const GroupListDecrypt = new Router();

GroupListDecrypt.post("/", async (ctx) => {
    const { GroupMaskShare } = ctx.request.query as {
        GroupMaskShare: string;
    };
    const FindMaskShare = await prisma.grouplistshare.findFirst({
        where: {
            id: GroupMaskShare,
        },
    });
    if (FindMaskShare === null) {
        ctx.body = { MaskShare: null, status: 200 };
    } else {
        ctx.body = {
            MaskShare: JSON.parse(FindMaskShare.MaskShare),
            status: 200,
        };
    }
});
