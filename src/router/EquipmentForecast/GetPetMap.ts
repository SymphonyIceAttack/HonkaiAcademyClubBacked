interface PetMap {
    [key: string]: string;
}

export default () => {
    return fetch("https://api.redbean.tech/illustrate/pet-map")
        .then((res) => res.json())
        .then((res: PetMap) => {
            return res;
        });
};
