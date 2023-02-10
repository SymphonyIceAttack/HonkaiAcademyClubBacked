import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import ValidateTimeStamp from "../ValidateTimeStamp.js";
const prisma = new PrismaClient();
const ScoreListUpdate = new Router();
export interface ScoreItemType {
    NickName: string;
    Account: string;
    MissingTimes: number;
    isMissed: boolean;

    timeStamp: number;

    recordId: string;
    userId: string;
}

ScoreListUpdate.post("/", async (ctx) => {
    const { choseTimeStamp } = ctx.request.query as {
        choseTimeStamp: string;
    };

    const ScoreList = JSON.parse(ctx.request.body) as ScoreItemType[];
    const [isValidateTimeStamp, Records] = await ValidateTimeStamp(
        choseTimeStamp
    );
    if (isValidateTimeStamp) {
        await Promise.all(
            ScoreList.map(async (item) => {
                return prisma.attendanceRecordSheet.update({
                    where: {
                        id: item.recordId,
                    },
                    data: {
                        isMiss: item.isMissed,
                    },
                });
            })
        );
    } else {
        await Promise.all(
            ScoreList.map(async (item) => {
                return prisma.attendanceRecordSheet.create({
                    data: {
                        isMiss: item.isMissed,
                        userId: item.userId,
                        timeStamp: choseTimeStamp,
                    },
                });
            })
        );
    }

    ctx.body = {
        msg: "修改成功",
        status: 200,
    };
});

export default ScoreListUpdate;
