import { Router } from "express";
import { passportCall } from "../../utils/passportCall.js";
import { ProductsController } from "../../controllers/index.js";
import { authorization } from "../../middleware/permissions.js";
import { rols } from "../../const/rols.js";

const router = Router();
router.get(
    "/",
    passportCall("current"),
    authorization(rols),
    ProductsController.getProducts
);

router.get(
    "/:id",
    passportCall("current"),
    authorization(rols),
    ProductsController.getProduct
);

router.post(
    "/",
    passportCall("current"),
    authorization(["admin"]),
    ProductsController.createProduct
);

router.patch(
    "/:id",
    passportCall("current"),
    authorization(["admin"]),
    ProductsController.updateProduct
);

router.delete(
    "/:id",
    passportCall("current"),
    authorization(["admin"]),
    ProductsController.deleteProduct
);

export default router;
