import Router from "koa-router";

const router = new Router();
import home from "./home/index";
import Login from "./Login/index";
import Register from "./Register/index";
import ValidateUrl from "./ValidateUrl/index";
import ValidateUser from "./ValidateUser/index";
import ScoreList from "./ScoreList";
import ScoreListUpdate from "./ScoreList/ScoreListUpdate";
import LeaderBoard from "./LeaderBoard";
import IllustratedBook from "./home/IllustratedBook";
import TimeStamp from "./TimeStamp";
import EquipmentForecast from "./EquipmentForecast";
router.use("/home", home.routes(), home.allowedMethods());
router.use("/login", Login.routes(), Login.allowedMethods());
router.use("/register", Register.routes(), Register.allowedMethods());
router.use(
    "/validateBackedUrl",
    ValidateUrl.routes(),
    ValidateUrl.allowedMethods()
);
router.use(
    "/ValidateUser",
    ValidateUser.routes(),
    ValidateUser.allowedMethods()
);
router.use("/ScoreList", ScoreList.routes(), ScoreList.allowedMethods());
router.use(
    "/ScoreListUpdate",
    ScoreListUpdate.routes(),
    ScoreListUpdate.allowedMethods()
);
router.use("/LeaderBoard", LeaderBoard.routes(), LeaderBoard.allowedMethods());
router.use(
    "/IllustratedBook",
    IllustratedBook.routes(),
    IllustratedBook.allowedMethods()
);
router.use("/TimeStamp", TimeStamp.routes(), TimeStamp.allowedMethods());
router.use(
    "/EquipmentForecast",
    EquipmentForecast.routes(),
    EquipmentForecast.allowedMethods()
);
router.redirect("/", "/home");

export default router;
