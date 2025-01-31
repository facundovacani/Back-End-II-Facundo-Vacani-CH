import { Router } from "express";
import { passportCall } from "../../utils/passportCall.js";
import { roleUser } from "../../middleware/roleUser.js";
import { UsersController } from "../../controllers/index.js";
import { authorization } from "../../middleware/permissions.js";
import { rols } from "../../const/rols.js";

const router = Router();
router.get("/", passportCall("current"), authorization(rols), UsersController.getUsers);

router.get("/current", passportCall("current"), authorization(rols), UsersController.getUser);

router.get("/logout", UsersController.logout);

router.post("/login", passportCall("login"), UsersController.login);

router.post("/register", passportCall("register"), UsersController.register);

export default router;
