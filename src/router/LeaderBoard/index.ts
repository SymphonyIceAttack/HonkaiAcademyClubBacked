import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const LeaderBoard = new Router();
LeaderBoard.post("/", async (ctx) => {
    const UserList = await prisma.user.findMany();
    const LeaderBoardList = await Promise.all(
        UserList.map(async (user) => {
            const Records = await prisma.attendanceRecordSheet.findMany({
                where: {
                    userId: user.id,
                },
            });

            let MissingTimes = 0;
            Records.forEach((record) => {
                record.isMiss ? (MissingTimes += 1) : null;
            });

            return {
                nickName: user.nickname,
                MissingTimes: MissingTimes,
            };
        })
    );
    LeaderBoardList.sort(
        (user1, user2) => user1.MissingTimes - user2.MissingTimes
    ).map((user) => ({
        nickName: user.nickName,
        MissingTimes: user.MissingTimes,
    }));

    ctx.body = {
        LeaderBoardList,
        status: 200,
    };
});

export default LeaderBoard;
