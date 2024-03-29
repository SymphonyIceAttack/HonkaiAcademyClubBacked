import error from "koa-json-error";

export default () => {
    return error({
        postFormat: (e, { stack, ...rest }) => {
            console.log(stack);

            if ((rest.httpCode = 413)) {
                console.log(rest);

                return {
                    msg: "文件太大",
                    status: 413,
                };
            }

            return process.env.NODE_ENV === "production"
                ? rest
                : { stack, ...rest };
        },
    });
};
