import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
const prisma = new PrismaClient();
const ScoreList = new Router();

ScoreList.post("/", async (ctx) => {
   

    const User = await prisma.user.findMany();
    const UserScoreList = User.map((user) => {
        return {
            NickName: user.nickname,
            Account: user.account,
            MissingTimes: user.MissingTimes,
            isFinished: false,
        };
    });

    ctx.body = {
        UserScoreList,
        status: 200,
    };
});

export default ScoreList;
