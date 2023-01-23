import moment from "moment";
import unique from "../../utils/uniqueArray";
import type { EquipmentItemType } from "./index";
export default async (url: string) => {
    const ALLEquipmentsArr: string[] = [];
    const res = await fetch(url, {
        method: "Get",
    })
        .then((res) => res.json())
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
            Equipment,
            DateList: dateArr
                .map((item) => item.startTime)
                .map((date) => moment(date).unix())
                .sort((timestamp1, timestamp2) => timestamp1 - timestamp2),
        };
    });
    return EquipmentForecastList;
};
