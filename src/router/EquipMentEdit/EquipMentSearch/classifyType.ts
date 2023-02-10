import type { EquipMentType, StringEquipMentType } from ".";
import CreateImgSrc from "./CreateImgSrc.js";
type armsType = {
    title: string;
    baseType: string;
    type: string;
    clientId: string;
    equipMentUid: string;
    ImgSrc: string;
    cost: number;
};

type clothingType = {
    title: string;
    hpBase: string;
    type: string;
    clientId: string;
    equipMentUid: string;
    ImgSrc: string;
    cost: number;
};

type PetType = {
    critRate: string;
    title: string;
    type: string;
    clientId: string;
    equipMentUid: string;
    ImgSrc: string;
    cost: number;
};

type badgeType = {
    type: string;
    clientId: string;
    ImgSrc: string;
    equipMentUid: string;
    title: string;
    cost: number;
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
                equipMentUid: item.uid,
                ImgSrc: CreateImgSrc(item.img),
                cost: parseInt(item.cost),
            };
            armsEquipMentList.push(NewItem);
            return
        }
        if (item.hpBase !== undefined && parseInt(item.hpBase!) !== 0) {
            const NewItem: Omit<clothingType, "hpBase"> = {
                title: item.title,
                clientId: currentClientId,
                type: "服装",
                equipMentUid: item.uid,
                ImgSrc: CreateImgSrc(item.img),
                cost: parseInt(item.cost),
            };
            clothingEquipMentList.push(NewItem);
            return
        }
        if (item.critRate !== undefined) {
            const NewItem: Omit<PetType, "critRate"> = {
                title: item.title,
                clientId: currentClientId,
                type: "使魔",
                equipMentUid: item.uid,
                ImgSrc: CreateImgSrc(item.img),
                cost: 0,
            };
            PetEquipMentList.push(NewItem);
            return
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
                equipMentUid: item.uid,
                ImgSrc: CreateImgSrc(item.img),
                cost: parseInt(item.cost),
            };
            BadgeEquipMnetList.push(NewItem);
            return
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
