import { PrismaClient, User } from "@prisma/client";
import { nanoid } from "nanoid";
const prisma = new PrismaClient();

Array.from({ length: 54 }, () => {
    return {};
}).map(async (user) => {
    await prisma.user.create({
        data: {
            nickname: nanoid(),
            account: nanoid(),
            password: nanoid(),
        },
    });
});
