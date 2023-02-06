import Router from "koa-router";
import classifyType from "./classifyType";
import _ from "lodash";
//baseType -> arms
//hpBase -> clothing
//critRate -> pet
//none -> badge

export type EquipMentType = {
    baseType?: string;
    hpBase?: string;
    critRate?: string;
    title: string;
    uid: string;
};
export type EquipMentOneListType = {
    type: string;
    clientId: string;
    ImgSrc: string;
    equipMentUid: string;
};
export type StringEquipMentType = "使魔" | "武器" | "徽章" | "服装";
export const EquipMentSearch = new Router();
EquipMentSearch.post("/", async (ctx) => {
    const { type, inputSearch, currentClientId } = ctx.request.query as {
        type: StringEquipMentType;
        currentClientId: string;
        inputSearch: string;
    };
    const AllEquipMentList: EquipMentType[] = await fetch(
        "https://api.redbean.tech/illustrate/all?server=merged"
    ).then((res) => res.json());
    const classifyEquipMentList = classifyType(
        AllEquipMentList,
        type,
        currentClientId
    );

    ctx.body = {
        SearchResultList: _.uniqBy(
            classifyEquipMentList.filter((item) => {
                return item.title.indexOf(inputSearch) !== -1;
            }),
            "title"
        ),
    };
});
