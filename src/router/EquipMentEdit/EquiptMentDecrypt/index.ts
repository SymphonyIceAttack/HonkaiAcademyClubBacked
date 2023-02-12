import CryptoJS from "crypto-js";
import Router from "koa-router";
import { SecretKey } from "../EquipMentCrypto/index.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const DecryptEquipMent = new Router();
DecryptEquipMent.post("/", async (ctx) => {
    const MaskShareID = ctx.request.body as string;

    const equipMemntShare = await prisma.equipMemntShare.findFirst({
        where: {
            id: MaskShareID,
        },
    });

    if (equipMemntShare !== null) {
        const decryptedData = JSON.parse(equipMemntShare.MaskShare);
        ctx.body = {
            decryptedData,
            status: 200,
        };
    } else {
        ctx.body = {
            decryptedData: null,
            status: 200,
        };
    }
});
