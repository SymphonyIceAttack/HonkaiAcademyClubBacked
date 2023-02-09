import CryptoJS from "crypto-js";
import Router from "koa-router";
export const SecretKey = "fdsafdsaf";
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
