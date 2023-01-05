import { writeFile } from "fs/promises";
import getImageSourcePath from "./getImageSourcePath.js";
export default async (imgData, type, account) => {
    const saveMsg = {
        err: null,
        msg: "Right",
    };
    const ImageSourcePath = getImageSourcePath();
    const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = new Uint8Array(Buffer.from(base64Data, "base64")); // 解码图片
    await writeFile(`${ImageSourcePath}/${account}/${type}.png`, dataBuffer).catch((error) => {
        saveMsg.err = error;
        saveMsg.msg = "Error";
    });
    return saveMsg;
};
//# sourceMappingURL=saveImageFile.js.map