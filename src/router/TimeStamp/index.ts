import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();
const TimeStamp = new Router();
TimeStamp.post("/", async (ctx) => {
    const Records = await prisma.attendanceRecordSheet.findMany({});

    const allTimeStamp: any[] = [];
    Records.forEach((record) => {
        allTimeStamp.push(record.timeStamp);
    });

    ctx.body = {
        status: 200,
        allTimeStamp: Array.from(new Set(allTimeStamp)),
    };
});

export default TimeStamp;
