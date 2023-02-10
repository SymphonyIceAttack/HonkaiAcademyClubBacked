import Router from "koa-router";

const router = new Router();
import home from "./home/index.js";
import Login from "./Login/index.js";
import Register from "./Register/index.js";
import ValidateUrl from "./ValidateUrl/index.js";
import ValidateUser from "./ValidateUser/index.js";
import ScoreList from "./ScoreList/index.js";
import ScoreListUpdate from "./ScoreList/ScoreListUpdate/index.js";
import LeaderBoard from "./LeaderBoard/index.js";
import IllustratedBook from "./home/IllustratedBook/index.js";
import TimeStamp from "./TimeStamp/index.js";
import EquipmentForecast from "./EquipmentForecast/index.js";
import {
    EquipMentSearch,
    EncryptEquipMent,
    DecryptEquipMent,
} from "./EquipMentEdit/index.js";
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
router.use(
    "/EquipMentSearch",
    EquipMentSearch.routes(),
    EquipMentSearch.allowedMethods()
);
router.use(
    "/EncryptEquipMent",
    EncryptEquipMent.routes(),
    EncryptEquipMent.allowedMethods()
);
router.use(
    "/DecryptEquipMent",
    DecryptEquipMent.routes(),
    DecryptEquipMent.allowedMethods()
);
router.redirect("/", "/home");

export default router;
