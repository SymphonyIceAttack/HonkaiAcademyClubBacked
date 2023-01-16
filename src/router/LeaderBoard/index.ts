import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const LeaderBoard = new Router();
LeaderBoard.post("/", async (ctx) => {
    const UserList = await prisma.user.findMany();
    const LeaderBoardList = UserList.sort(
        (user1, user2) => user1.MissingTimes - user2.MissingTimes
    ).map((user) => ({
        nickName: user.nickname,
        MissingTimes: user.MissingTimes,
    }));

    ctx.body = {
        LeaderBoardList,
        status: 200,
    };
});

export default LeaderBoard;
