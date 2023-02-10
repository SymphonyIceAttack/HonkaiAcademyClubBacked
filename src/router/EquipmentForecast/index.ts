import Router from "koa-router";
import GetEquipmentForecastList from "./GetEquipmentForecastList.js";
import GetPetForecastList from "./GetPetForecastList.js";
import _ from "lodash";
const EquipmentForecast = new Router();
export type EquipmentItemType = {
    startTime: string;
    endTime: string;
    data: string[];
};

EquipmentForecast.get("/", async (ctx) => {
    const PrincessForecastList = GetEquipmentForecastList(
        "https://redbean.tech/list/auto/high",
        "公主"
    );
    const WitchForecastList = GetEquipmentForecastList(
        "https://redbean.tech/list/auto/custom",
        "魔女"
    );
    const MagicalGirlForecastList = GetEquipmentForecastList(
        "https://redbean.tech/list/auto/special",
        "魔法"
    );
    const PetForecastList = GetPetForecastList();

    const [
        MagicalGirlForecastListResult,
        PrincessForecastListResult,
        WitchForecastListResult,
        PetForecastListResult,
    ] = await Promise.all([
        MagicalGirlForecastList,
        PrincessForecastList,
        WitchForecastList,
        PetForecastList,
    ]);
    ctx.body = {
        ALLForecastList: [
            ...MagicalGirlForecastListResult,
            ...PrincessForecastListResult,
            ...WitchForecastListResult,
            ...PetForecastListResult,
        ],
        status: 200,
    };
});

export default EquipmentForecast;
