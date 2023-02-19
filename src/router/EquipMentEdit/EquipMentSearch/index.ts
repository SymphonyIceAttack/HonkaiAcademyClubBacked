import Router from "koa-router";
import classifyType from "./classifyType.js";
import fetch from "node-fetch";
import { agent } from "../../../GlobalFetchSetting/Agent.js";
import _ from "lodash";
//baseType -> arms
//hpBase -> clothing
//critRate -> pet
//none -> badge

export type EquipMentType = {
    type:string;
    baseType?: string;
    hpBase?: string;
    critRate?: string;
    title: string;
    uid: string;
    img: string;
    cost: string;
};
export type EquipMentOneListType = {
    type: string;
    clientId: string;
    ImgSrc: string;
    equipMentUid: string;
    title: string;
    cost: number;
};
export type StringEquipMentType = "使魔" | "武器" | "徽章" | "服装";
export const EquipMentSearch = new Router();
EquipMentSearch.post("/", async (ctx) => {
    const { type, inputSearch, currentClientId } = ctx.request.query as {
        type: StringEquipMentType;
        currentClientId: string;
        inputSearch: string;
    };
    const AllEquipMentList: EquipMentType[] = (await fetch(
        "https://api.redbean.tech/illustrate/all?server=merged",
        { agent }
    ).then((res) => res.json())) as any;
    const classifyEquipMentList: EquipMentOneListType[] = classifyType(
        AllEquipMentList,
        type,
        currentClientId
    );

    ctx.body = {
        SearchResultList: classifyEquipMentList.filter((item) => {
            if (inputSearch === "") return true;
            return item.title.indexOf(inputSearch) !== -1;
        }),
    };
});
