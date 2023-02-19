import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
const prisma = new PrismaClient();
const nanoid = customAlphabet("QWERTYUIOPASDFGHJKLZXCVBNM123456789", 8);
export const GroupListEncrypt = new Router();

GroupListEncrypt.post("/", async (ctx) => {
    const GroupListMaskShare = ctx.request.body;
    const FindMaskShare = await prisma.groupListShare.findMany({
        where: {
            MaskShare: GroupListMaskShare,
        },
    });
    if (FindMaskShare.length===0) {
        const CreateMaskShare = await prisma.groupListShare.create({
            data: {
                id: nanoid(),
                MaskShare: GroupListMaskShare,
            },
        });
        ctx.body = { MaskShare: CreateMaskShare.id, status: 200 };
    } else {
        ctx.body = { MaskShare: FindMaskShare[0].id, status: 200 };
    }
});
