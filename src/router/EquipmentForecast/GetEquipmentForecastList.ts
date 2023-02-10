import moment from "moment";
import unique from "../../utils/uniqueArray.js";
import type { EquipmentItemType } from "./index.js";
import { RemoveApproximation } from "./RemoveApproximation.js";
import fetch from "node-fetch";
import { agent } from "../../GlobalFetchSetting/Agent.js";
export default async (url: string, type: "公主" | "魔女" | "魔法" | "使魔") => {
    const ALLEquipmentsArr: string[] = [];
    const res = await fetch(url, {
        method: "Get",
        agent,
    })
        .then((res) => res.json() as any)
        .then((res: EquipmentItemType[]) => {
            return res;
        });
    res.forEach((item) => {
        ALLEquipmentsArr.push(...item.data);
    });

    const UniQueEquipmentArr: string[] = unique<string>(ALLEquipmentsArr);
    const EquipmentForecastList = UniQueEquipmentArr.map((Equipment) => {
        const dateArr = res.filter((item) => item.data.indexOf(Equipment) > -1);
        return {
            Equipment: type === "使魔" ? Equipment : Equipment + "-" + type,
            DateList: RemoveApproximation(
                dateArr
                    .map((item) => item.startTime)
                    .map((date) => moment(date).unix())
                    .sort((timestamp1, timestamp2) => timestamp1 - timestamp2)
            ),
        };
    });
    return EquipmentForecastList;
};
