import Router from "koa-router";

const ValidateUrl = new Router();
ValidateUrl.post("/", (ctx) => {
    console.log(123);

    ctx.body = {
        status: 200,
    };
});

export default ValidateUrl;
