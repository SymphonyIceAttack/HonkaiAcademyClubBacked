import Router from "koa-router";
const IllustratedBook = new Router();
type IllustratedBookItemType = {
    name: string;
};

IllustratedBook.get("/", async (ctx) => {
    const res: IllustratedBookItemType[] = await fetch(
        "https://api.redbean.tech/illustrate/all?server=merged"
    ).then((res) => res.json());

    ctx.body = {
        status: 200,
        msg: "ok",
    };
});

export default IllustratedBook;
