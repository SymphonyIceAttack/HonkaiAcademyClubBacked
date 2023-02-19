import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
const prisma = new PrismaClient();
const nanoid = customAlphabet("QWERTYUIOPASDFGHJKLZXCVBNM123456789", 8);
export const GroupListEncrypt = new Router();

GroupListEncrypt.post("/", async (ctx) => {
    const GroupListMaskShare = ctx.request.body;


    const FindMaskShare = await prisma.grouplistshare.findFirst({
        where: {
            MaskShare: GroupListMaskShare,
        },
    });
    if (FindMaskShare === null) {
        const CreateMaskShare = await prisma.grouplistshare.create({
            data: {
                id: nanoid(),
                MaskShare: GroupListMaskShare,
            },
        });
        ctx.body = { MaskShare: CreateMaskShare.id, status: 200 };
    } else {
        ctx.body = { MaskShare: FindMaskShare.id, status: 200 };
    }
});
