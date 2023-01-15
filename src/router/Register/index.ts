import Router from "koa-router";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";
import ValidateAccount from "./ValidateAccount";
import ValidateNickName from "./ValidateNickName";
import getImageSourcePath from "../../utils/getImageSourcePath";
import saveImageFile from "../../utils/saveImageFile";
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
    const isAccountValidate = await ValidateAccount(RegisterParams.account);
    const isNickNameValidate = await ValidateNickName(RegisterParams.nickname);
    if (isAccountValidate && isNickNameValidate) {
        await fs.mkdir(`${getImageSourcePath()}/${RegisterParams.account}`, {
            recursive: true,
        });
        await prisma.user.create({
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
        });
        await saveImageFile(
            RegisterParams.avatarImage,
            "avatarImage",
            RegisterParams.account
        );
        await saveImageFile(
            RegisterParams.equipmentImage,
            "equipmentImage",
            RegisterParams.account
        );
        await saveImageFile(
            RegisterParams.MoeChapterImage,
            "MoeChapterImage",
            RegisterParams.account
        );

        ctx.body = {
            msg: "注册成功",
            status: 200,
        };
    } else if (!isAccountValidate) {
        ctx.body = {
            msg: "账户已存在",
            status: 205,
        };
    } else if (!isNickNameValidate) {
        ctx.body = {
            msg: "昵称已存在",
            status: 206,
        };
    }
});
export default Register;
