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
    const FindMaskShare = await prisma.groupListShare.findMany({
        where: {
            id: GroupMaskShare,
        },
    });
    if (FindMaskShare.length === 0) {
        ctx.body = { MaskShare: null, status: 200 };
    } else {
        ctx.body = {
            MaskShare: JSON.parse(FindMaskShare[0].MaskShare),
            status: 200,
        };
    }
});
