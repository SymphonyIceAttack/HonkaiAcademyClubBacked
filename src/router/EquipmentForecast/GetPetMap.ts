interface PetMap {
    [key: string]: string;
}
import fetch from "node-fetch";
import { agent } from "../../GlobalFetchSetting/Agent";
export default () => {
    return fetch("https://api.redbean.tech/illustrate/pet-map", {
        agent,
    })
        .then((res) => res.json() as any)
        .then((res: PetMap) => {
            return res;
        });
};
