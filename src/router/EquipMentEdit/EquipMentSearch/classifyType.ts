import type { EquipMentType, StringEquipMentType } from ".";
import CreateImgSrc from "./CreateImgSrc";
type armsType = {
    title: string;
    baseType: string;
    type: string;
    clientId: string;
    uid: string;
    imgSrc: string;
};

type clothingType = {
    title: string;
    hpBase: string;
    type: string;
    clientId: string;
    uid: string;
    imgSrc: string;
};

type PetType = {
    critRate: string;
    title: string;
    type: string;
    clientId: string;
    uid: string;
    imgSrc: string;
};

type badgeType = {
    title: string;
    type: string;
    clientId: string;
    uid: string;
    imgSrc: string;
};
export default (
    AllEquipMentList: EquipMentType[],
    type: StringEquipMentType,
    currentClientId: string
): badgeType[] => {
    const armsEquipMentList: Omit<armsType, "baseType">[] = [];
    const clothingEquipMentList: Omit<clothingType, "hpBase">[] = [];
    const PetEquipMentList: Omit<PetType, "critRate">[] = [];
    const BadgeEquipMnetList: badgeType[] = [];
    AllEquipMentList.forEach((item) => {
        if (item.baseType !== undefined) {
            const NewItem: Omit<armsType, "baseType"> = {
                title: item.title,
                clientId: currentClientId,
                type: "武器",
                uid: item.uid,
                imgSrc: CreateImgSrc(item.uid),
            };
            armsEquipMentList.push(NewItem);
        }
        if (item.hpBase !== undefined) {
            const NewItem: Omit<clothingType, "hpBase"> = {
                title: item.title,
                clientId: currentClientId,
                type: "服装",
                uid: item.uid,
                imgSrc: CreateImgSrc(item.uid),
            };
            clothingEquipMentList.push(NewItem);
        }
        if (item.critRate !== undefined) {
            const NewItem: Omit<PetType, "critRate"> = {
                title: item.title,
                clientId: currentClientId,
                type: "使魔",
                uid: item.uid,
                imgSrc: CreateImgSrc(item.uid),
            };
            PetEquipMentList.push(NewItem);
        }

        if (
            item.hpBase === undefined &&
            item.critRate === undefined &&
            item.baseType === undefined
        ) {
            const NewItem: badgeType = {
                title: item.title,
                clientId: currentClientId,
                type: "徽章",
                uid: item.uid,
                imgSrc: CreateImgSrc(item.uid),
            };
            BadgeEquipMnetList.push(NewItem);
        }
    });

    switch (type) {
        case "武器":
            return armsEquipMentList;
            break;
        case "服装":
            return clothingEquipMentList;
            break;
        case "徽章":
            return BadgeEquipMnetList;
            break;
        case "使魔":
            return PetEquipMentList;
            break;
        default:
            const endType: never = type;
            return endType;
    }
};
