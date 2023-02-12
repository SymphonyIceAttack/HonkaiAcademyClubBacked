import CryptoJS from "crypto-js";
import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
const prisma = new PrismaClient();
const nanoid = customAlphabet("QWERTYUIOPASDFGHJKLZXCVBNM123456789", 8);
export const SecretKey =
    "79540473-df1c-476a-ac85-4994a7a71af6-27747e3c-fa20-4bd4-b9d9-1427331f006c";
export const EncryptEquipMent = new Router();
EncryptEquipMent.post("/", async (ctx) => {
    const body = ctx.request.body as string;

    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(body, SecretKey).toString();

    const equipMemntShare = await prisma.equipMemntShare.findFirst({
        where: {
            MaskShare: ciphertext,
        },
    });
    if (equipMemntShare === null) {
        const result = await prisma.equipMemntShare.create({
            data: {
                id: nanoid(),
                MaskShare: ciphertext,
            },
        });

        // Decrypt
        const bytes = CryptoJS.AES.decrypt(ciphertext, SecretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        ctx.body = {
            ciphertext: result.id,
            decryptedData,
            status: 200,
        };
    } else {
        // Decrypt
        const bytes = CryptoJS.AES.decrypt(ciphertext, SecretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        ctx.body = {
            ciphertext: equipMemntShare.id,
            decryptedData,
            status: 200,
        };
    }
});
