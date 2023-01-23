import GetPetMap from "./GetPetMap";
import GetEquipmentForecastList from "./GetEquipmentForecastList";
export default async () => {
    const PetMap = await GetPetMap();
    return GetEquipmentForecastList("https://redbean.tech/list/auto/pet")
        .then((res) => {
            return res.map((item) => {
                if (PetMap[item.Equipment] === undefined)
                    return {
                        Equipment: "",
                        DateList: [],
                    };
                return {
                    Equipment: PetMap[item.Equipment],
                    DateList: item.DateList,
                };
            });
        })
        .then((res) => res.filter((item) => item.DateList.length !== 0));
};
