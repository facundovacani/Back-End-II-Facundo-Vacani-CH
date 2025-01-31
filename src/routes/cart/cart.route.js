import { Router } from "express";
import { passportCall } from "../../utils/passportCall.js";
import { CartController } from "../../controllers/index.js";
import { authorization } from "../../middleware/permissions.js";
import { rols } from "../../const/rols.js";

const router = Router();

router.get(
    "/:id",
    passportCall("current"),
    authorization(rols),
    CartController.getCart
);

router.get(
    "/user/:id",
    passportCall("current"),
    authorization(rols),
    CartController.getCartByUser
);

router.post(
    "/",
    passportCall("current"),
    authorization(rols),
    CartController.createCart
);

router.post(
    "/:id/products/",
    passportCall("current"),
    authorization(["user"]),
    CartController.createAProductInCart
);

router.post(
    "/:id/purchase",
    passportCall("current"),
    authorization(rols),
    CartController.finish
);

router.patch(
    "/:id",
    passportCall("current"),
    authorization(rols),
    CartController.updateCart
);

router.patch(
    "/:id/products/:productId",
    passportCall("current"),
    authorization(["user"]),
    CartController.updateProductInCart
);

router.delete(
    "/:id",
    passportCall("current"),
    authorization(rols),
    CartController.deleteCart
);

router.delete(
    "/:id/products/:productId",
    passportCall("current"),
    authorization(rols),
    CartController.deleteCart
);

export default router;
