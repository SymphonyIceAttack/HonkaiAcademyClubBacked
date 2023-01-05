import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async (account) => {
    if (account === "")
        return false;
    const UerArray = await prisma.user.findMany({
        where: {
            account: account,
        },
    });
    return UerArray.length === 0;
};
//# sourceMappingURL=ValidateAccount.js.map