import Router from "koa-router";
import fetch from "node-fetch";
import { agent } from "../../../GlobalFetchSetting/Agent.js";
import _ from "lodash";
import CreateImgSrc from "../EquipMentSearch/CreateImgSrc.js";

export type EquipMentType = {
    baseType?: string;
    hpBase?: string;
    critRate?: string;
    title: string;
    uid: string;
    img: string;
    cost: string;
    type: string;
    seriesText: string;
};
export const FantasySkillALLImg = new Router();

FantasySkillALLImg.get("/", async (ctx) => {
    const AllEquipMentList: EquipMentType[] = (await fetch(
        "https://api.redbean.tech/illustrate/all?server=merged",
        { agent }
    ).then((res) => res.json())) as any;
    ctx.body = {
        FantasySkillALLImg: _.uniqBy(
            AllEquipMentList.filter((item) => {
                return (
                    item.seriesText == "空想神话" ||
                    item.title.indexOf("空想星灵") > -1
                );
            })
                .filter((item) => {
                    return item.title.length > 4 || item.title == "灾祸之兽";
                })
                .map((item) => {
                    if (item.title.indexOf("空想星灵") > -1) {
                        item.title = item.title.slice(0, 7);
                        return item;
                    } else {
                        return item;
                    }
                }),
            "title"
        ).map((item) => {
            if (item.title == "灾祸之兽") {
                return {
                    imgSrc: CreateImgSrc((parseInt(item.img) + 1).toString()),
                };
            }
            return {
                imgSrc: CreateImgSrc(item.img),
            };
        }),
        status: 200,
    };
});
