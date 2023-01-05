import Router from "koa-router";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";
import ValidateAccount from "./ValidateAccount.js";
import getImageSourcePath from "../../utils/getImageSourcePath.js";
import saveImageFile from "../../utils/saveImageFile.js";
const prisma = new PrismaClient();
const Register = new Router();
type RegisterType = {
    account: string;
    password: string;
    nickname: string;
    avatarImage: string;
    equipmentImage: string;
    MoeChapterImage: string;
};
Register.post("/", async (ctx) => {
    const { json } = ctx.request.body as {
        json: string;
    };
    const RegisterParams = JSON.parse(json) as RegisterType;
    const ImageSourcePathRoot = `staticSource/${RegisterParams.account}`;
    const isValidate = await ValidateAccount(RegisterParams.account);
    isValidate &&
        (await fs.mkdir(`${getImageSourcePath()}/${RegisterParams.account}`, {
            recursive: true,
        }));
    isValidate &&
        (await prisma.user.create({
            data: {
                account: RegisterParams.account,
                password: RegisterParams.password,
                nickname: RegisterParams.nickname,
                avatarImage: {
                    create: {
                        path: `${ImageSourcePathRoot}/avatarImage.png`,
                        size: RegisterParams.avatarImage.length,
                        mimeType: "image",
                    },
                },
                equipmentImage: {
                    create: {
                        path: `${ImageSourcePathRoot}/equipmentImage.png`,
                        size: RegisterParams.equipmentImage.length,
                        mimeType: "image",
                    },
                },
                MoeChapterImage: {
                    create: {
                        path: `${ImageSourcePathRoot}/MoeChapterImage.png`,
                        size: RegisterParams.MoeChapterImage.length,
                        mimeType: "image",
                    },
                },
            },
        }));
    isValidate &&
        (await saveImageFile(
            RegisterParams.avatarImage,
            "avatarImage",
            RegisterParams.account
        ));
    isValidate &&
        (await saveImageFile(
            RegisterParams.equipmentImage,
            "equipmentImage",
            RegisterParams.account
        ));
    isValidate &&
        (await saveImageFile(
            RegisterParams.MoeChapterImage,
            "MoeChapterImage",
            RegisterParams.account
        ));

    isValidate
        ? (ctx.body = {
              msg: "注册成功",
              status: 200,
          })
        : (ctx.body = {
              msg: "注册失败",
              status: 205,
          });
});
export default Register;
