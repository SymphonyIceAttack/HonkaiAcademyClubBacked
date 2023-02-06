import Router from "koa-router";
import GetEquipmentForecastList from "./GetEquipmentForecastList";
import GetPetForecastList from "./GetPetForecastList";
import _ from "lodash";
const EquipmentForecast = new Router();
export type EquipmentItemType = {
    startTime: string;
    endTime: string;
    data: string[];
};

EquipmentForecast.get("/", async (ctx) => {
    const PrincessForecastList = await GetEquipmentForecastList(
        "https://redbean.tech/list/auto/high",
        "公主"
    );
    const WitchForecastList = await GetEquipmentForecastList(
        "https://redbean.tech/list/auto/custom",
        "魔女"
    );
    const MagicalGirlForecastList = await GetEquipmentForecastList(
        "https://redbean.tech/list/auto/special",
        "魔法"
    );
    const PetForecastList = await GetPetForecastList();

    const ALLForecastList = [
        ...MagicalGirlForecastList,
        ...PrincessForecastList,
        ...WitchForecastList,
        ...PetForecastList,
    ];
    ctx.body = {
        ALLForecastList,
        status: 200,
    };
});

export default EquipmentForecast;
