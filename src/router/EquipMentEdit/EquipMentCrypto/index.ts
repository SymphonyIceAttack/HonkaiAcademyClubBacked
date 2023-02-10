import CryptoJS from "crypto-js";
import Router from "koa-router";
export const SecretKey =
    "79540473-df1c-476a-ac85-4994a7a71af6-27747e3c-fa20-4bd4-b9d9-1427331f006c";
export const EncryptEquipMent = new Router();
EncryptEquipMent.post("/", (ctx) => {
    const body = ctx.request.body as string;

    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(body, SecretKey).toString();

    // Decrypt
    const bytes = CryptoJS.AES.decrypt(ciphertext, SecretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    ctx.body = {
        ciphertext,
        decryptedData,
        status: 200,
    };
});
