import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getOneProduct,
} from "../handlers/productHandlers.js";
import {
  addProductBodyValidation,
  addProductNameValidation,
  addProductPriceValidation,
} from "../middlewares/productMiddlewares.js";

const router = Router();

router.post(
  "/add",
  [
    addProductBodyValidation,
    addProductNameValidation,
    addProductPriceValidation,
  ],
  addProduct,
);
router.get("/", getAllProducts);
router.get("/:productId", getOneProduct);

export default router;
