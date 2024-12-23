import { Router } from "express";
import { passportCall } from "../../utils/passportCall.js";
import { roleUser } from "../../middleware/index.js";
import { userController } from "../../controllers/index.js";

const router = Router();

router.get("/", passportCall("current"), roleUser, userController.getUsers);

router.get("/current", passportCall("current"), userController.getUser);

router.get("/logout", userController.logout);

router.post("/login", passportCall("login"), userController.login);

router.post("/register", passportCall("register"), userController.register);

export default router;
