import { PrismaClient, attendanceRecordSheet } from "@prisma/client";
import { nanoid } from "nanoid";
const prisma = new PrismaClient();
export default async (
    TimeStamp: string
): Promise<[boolean, attendanceRecordSheet[]]> => {
    const Records = await prisma.attendanceRecordSheet.findMany({
        where: {
            timeStamp: TimeStamp,
        },
    });
    return [Records.length > 0, Records];
};
