import Router from "koa-router";
const ValidateUrl = new Router();
ValidateUrl.post("/", (ctx) => {
    ctx.body = {
        status: 200,
    };
});
export default ValidateUrl;
//# sourceMappingURL=index.js.map