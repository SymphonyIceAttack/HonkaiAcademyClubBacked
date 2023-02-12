import CryptoJS from "crypto-js";
import Router from "koa-router";
import { SecretKey } from "../EquipMentCrypto/index.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const DecryptEquipMent = new Router();
DecryptEquipMent.post("/", async (ctx) => {
    const MaskShareID = ctx.request.body as string;

    const equipMemntShare = await prisma.equipMemntShare.findUnique({
        where: {
            id: MaskShareID,
        },
    });

    if (equipMemntShare !== null) {
        // Decrypt
        const bytes = CryptoJS.AES.decrypt(
            equipMemntShare.MaskShare,
            SecretKey
        );
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        ctx.body = {
            decryptedData,
            status: 200,
        };
    }
});
