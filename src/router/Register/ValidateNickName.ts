import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (nickname: string): Promise<boolean> => {
    if (nickname === "") return false;
    const UerArray = await prisma.user.findMany({
        where: {
            nickname: nickname,
        },
    });
    return UerArray.length === 0;
};
