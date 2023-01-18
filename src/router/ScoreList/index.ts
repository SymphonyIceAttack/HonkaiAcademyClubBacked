import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import ValidateTimeStamp from "./ValidateTimeStamp";
const prisma = new PrismaClient();
const ScoreList = new Router();

ScoreList.post("/", async (ctx) => {
    const { timeStamp } = ctx.request.query as {
        timeStamp: string;
    };


    const [isValidateTimeStamp, Records] = await ValidateTimeStamp(
        timeStamp
    );
    if (isValidateTimeStamp) {
        const UserScoreList = await Promise.all(
            Records.map(async (record) => {
                const user = await prisma.user.findFirst({
                    where: {
                        id: record.userId,
                    },
                });
                return {
                    NickName: user!.nickname,
                    Account: user!.account,
                    MissingTimes: user!.MissingTimes,
                    isMissed: record.isMiss,
                    timeStamp: record.timeStamp,
                    recordId: record.id,
                };
            })
        );
        ctx.body = {
            UserScoreList,
            status: 200,
        };
    } else {
        const userList = await prisma.user.findMany({});
        const UserScoreList = await Promise.all(
            userList.map(async (user) => {
                return {
                    NickName: user.nickname,
                    Account: user.account,
                    MissingTimes: user.MissingTimes,
                    isMissed: false,
                    timeStamp: timeStamp,
                    userId: user.id,
                };
            })
        );
        ctx.body = {
            UserScoreList,
            status: 200,
        };
    }
});

export default ScoreList;
