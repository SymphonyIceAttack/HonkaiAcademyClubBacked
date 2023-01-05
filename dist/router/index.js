import Router from "koa-router";
const router = new Router();
import home from "./home/index.js";
import Login from "./Login/index.js";
import Register from "./Register/index.js";
import ValidateUrl from "./ValidateUrl/index.js";
import ValidateUser from "./ValidateUser/index.js";
router.use("/home", home.routes(), home.allowedMethods());
router.use("/login", Login.routes(), Login.allowedMethods());
router.use("/register", Register.routes(), Register.allowedMethods());
router.use("/validateBackedUrl", ValidateUrl.routes(), ValidateUrl.allowedMethods());
router.use("/ValidateUser", ValidateUser.routes(), ValidateUser.allowedMethods());
export default router;
//# sourceMappingURL=index.js.map