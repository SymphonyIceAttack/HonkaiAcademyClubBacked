import { writeFile } from "fs/promises";
import getImageSourcePath from "./getImageSourcePath";

type saveMsgType = {
    err: null | NodeJS.ErrnoException;
    msg: string;
};

export default async (
    imgData: string,
    type: "avatarImage" | "equipmentImage" | "MoeChapterImage",
    account: string
): Promise<saveMsgType> => {
    const saveMsg: saveMsgType = {
        err: null,
        msg: "Right",
    };
    const ImageSourcePath = getImageSourcePath();
    const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = new Uint8Array(Buffer.from(base64Data, "base64")); // 解码图片
    await writeFile(
        `${ImageSourcePath}/${account}/${type}.png`,
        dataBuffer
    ).catch((error) => {
        saveMsg.err = error;
        saveMsg.msg = "Error";
    });
    return saveMsg;
};
