import CryptoJS from "crypto-js";
import Router from "koa-router";
import { SecretKey } from "../EquipMentCrypto/index.js";
export const DecryptEquipMent = new Router();
DecryptEquipMent.post("/", (ctx) => {
    const MaskShare = ctx.request.body as string;

    console.log(MaskShare);

    // Decrypt
    const bytes = CryptoJS.AES.decrypt(MaskShare, SecretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    ctx.body = {
        decryptedData,
        status: 200,
    };
});
