import { nanoid } from "nanoid";

const Serect = process.env.NODE_ENV === "development" ? "dssadfasdfafasdf" : nanoid();
export default () => {
    return Serect;
};
