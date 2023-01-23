import Router from "koa-router";
import GetEquipmentForecastList from "./GetEquipmentForecastList";
import GetPetForecastList from "./GetPetForecastList";

const EquipmentForecast = new Router();
export type EquipmentItemType = {
    startTime: string;
    endTime: string;
    data: string[];
};

EquipmentForecast.get("/", async (ctx) => {
    const PrincessForecastList = await GetEquipmentForecastList(
        "https://redbean.tech/list/auto/high"
    );
    const WitchForecastList = await GetEquipmentForecastList(
        "https://redbean.tech/list/auto/custom"
    );
    const MagicalGirlForecastList = await GetEquipmentForecastList(
        "https://redbean.tech/list/auto/special"
    );
    const PetForecastList = await GetPetForecastList();

    console.log(PetForecastList.length);
    console.log(PrincessForecastList.length);
    console.log(WitchForecastList.length);
    console.log(MagicalGirlForecastList.length);

    const ALLForecastList = [
        ...PrincessForecastList,
        ...WitchForecastList,
        ...MagicalGirlForecastList,
        ...PetForecastList,
    ];

    ctx.body = {
        ALLForecastList,
        status: 200,
    };
});

export default EquipmentForecast;
