import { Router } from "express";
import { getAllProducts, getOneProduct } from "../handlers/productHandlers.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productId", getOneProduct);

export default router;
