import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
const prisma = new PrismaClient();
const ScoreListUpdate = new Router();
export interface ScoreItemType {
    NickName: string;
    Account: string;
    MissingTimes: number;
    isFinished: boolean;
}

ScoreListUpdate.post("/", async (ctx) => {
    const ScoreList = JSON.parse(ctx.request.body) as ScoreItemType[];

    await Promise.all(
        ScoreList.map(async (item) => {
            return prisma.user.update({
                where: {
                    account: item.Account,
                },
                data: {
                    MissingTimes: item.MissingTimes + (item.isFinished ? 1 : 0),
                },
            });
        })
    );

    ctx.body = {
        msg: "修改成功",
        status: 200,
    };
});

export default ScoreListUpdate;
